import { useAPI } from './APIProvider';

export function useFs() {
  return useAPI().fs;
}
