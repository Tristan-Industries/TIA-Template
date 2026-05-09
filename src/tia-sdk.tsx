import React, { createContext, useContext, useEffect, useState } from 'react';

export interface TiaAPI {
  fs: {
    ls: (path: string) => Promise<any[]>;
    readFile: (path: string) => Promise<string>;
    writeFile: (path: string, content: string) => Promise<void>;
    mkdir: (path: string) => Promise<void>;
    rm: (path: string) => Promise<void>;
    exists: (path: string) => Promise<boolean>;
  };
  alerts: {
    show: (message: string, title?: string, type?: string) => Promise<void>;
  };
  user: any;
  shell: any;
  window: any;
  apps: any;
}

const TiaContext = createContext<TiaAPI | null>(null);

export function TiaProvider({ children }: { children: React.ReactNode }) {
  const [api, setApi] = useState<TiaAPI | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'tipro:api-ready') {
        const proxyApi: TiaAPI = {
          fs: {
            ls: (path) => callParent('fs:ls', { path }),
            readFile: (path) => callParent('fs:readFile', { path }),
            writeFile: (path, content) => callParent('fs:writeFile', { path, content }),
            mkdir: (path) => callParent('fs:mkdir', { path }),
            rm: (path) => callParent('fs:rm', { path }),
            exists: (path) => callParent('fs:exists', { path }),
          },
          alerts: {
            show: (message, title, type) => callParent('alerts:show', { message, title, type }),
          },
          user: {},
          shell: {},
          window: {},
          apps: {},
        };
        setApi(proxyApi);
      }
    };

    window.addEventListener('message', handleMessage);
    window.parent.postMessage({ type: 'tipro:app-loaded' }, '*');

    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const callParent = (method: string, args: any): Promise<any> => {
    const id = Math.random().toString(36).substring(7);
    return new Promise((resolve, reject) => {
      const handler = (e: MessageEvent) => {
        if (e.data.id === id) {
          window.removeEventListener('message', handler);
          if (e.data.error) reject(new Error(e.data.error));
          else resolve(e.data.result);
        }
      };
      window.addEventListener('message', handler);
      window.parent.postMessage({ type: 'tipro:api-call', id, method, args }, '*');
    });
  };

  if (!api) {
    return (
      <div style={{
        height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#1a1b1e', color: '#8ab4f8', fontFamily: 'sans-serif'
      }}>
        Connecting to tiPRO...
      </div>
    );
  }

  return <TiaContext.Provider value={api}>{children}</TiaContext.Provider>;
}

export function useAPI() {
  const context = useContext(TiaContext);
  if (!context) throw new Error('useAPI must be used within a TiaProvider');
  return context;
}
