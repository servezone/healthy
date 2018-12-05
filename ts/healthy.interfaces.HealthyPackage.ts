export interface IHealthyPackage {
  memoryUsage: number;
  cpuUsage: number;
  gcRequested: boolean;
  serviceSelfAnalysis: 'healthy' | 'just ok' | 'unhealthy'
}

