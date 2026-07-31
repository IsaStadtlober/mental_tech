export type MapNodeState = 'completed' | 'current' | 'locked';

export interface MapNode {
  id: number;
  x: number;
  y: number;
  label: string;
  description: string;
}

export interface StudentSession {
  explorerName: string;
  coins: number;
}