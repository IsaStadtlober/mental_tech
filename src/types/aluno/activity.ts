import type { MissionStatus } from './mission';

export interface RecentActivity {
  id: string;
  title: string;
  status: MissionStatus;
  grade?: number;
  dateLabel: string;
}
export type HistoryFilter = 'all' | MissionStatus;