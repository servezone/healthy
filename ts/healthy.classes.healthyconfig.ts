import * as plugins from './healthy.plugins'

export class HealthyConfig {
  maxMemoryMb: number // in MegaBytes
  maxCpuPercentage: number // percentage

  constructor() {
    this.maxMemoryMb = 1500;
    this.maxCpuPercentage = 90;
  }
}