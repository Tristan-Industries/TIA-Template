import { useAPI } from './APIProvider';

export function useUser() {
  return useAPI().user;
}
