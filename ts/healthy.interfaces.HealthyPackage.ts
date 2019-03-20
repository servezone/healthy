export interface IHealthyPackage {
  memoryUsage: number;
  cpuUsage: number;
  gcRequested: boolean;
  timedOut: boolean;
  serviceSelfAnalysis: 'healthy' | 'just ok' | 'unhealthy';
}
