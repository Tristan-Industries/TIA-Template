import { useAPI } from './APIProvider';

export function useAlerts() {
  return useAPI().alerts;
}
