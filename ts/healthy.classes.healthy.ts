import * as plugins from './healthy.plugins';

import { IHealthy }

export interface IHealthyOptions {
  timeout?: number;
  allowedMemoryInMB?: number;
}


/**
 * Healthy class
 * expects a HealthyPackage on port 8765
 */
export class Healthy {
  options: IHealthyOptions;

  constructor(optionsArg: IHealthyOptions = {}) {
    const defaultOptions: IHealthyOptions = {};

    // merge 
    this.options = {
      ...defaultOptions,
      ...optionsArg
    } 
  }

  /**
   * performs a health check
   */
  async doHealthCheck() {
    const timeout = new plugins.smarttime.Timer(2000);
    timeout.completed.then(() => {
      console.log('health check timed out')
      process.exit(1)
    })
    timeout.start()

    const response = await plugins.smartrequest.getJson('http://localhost:8765');
    timeout.reset(); // health chck completed in time, so lets stop here.

    const reponseHealthPackage

  };
}