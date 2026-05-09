import { useAPI } from './APIProvider';

export function useWindow() { return useAPI().window; }
