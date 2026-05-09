import { useAPI } from './APIProvider';

export function useShell() { return useAPI().shell; }
