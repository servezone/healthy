import { logger } from './healthy.logging';
import * as plugins from './healthy.plugins';

import { HealthyConfig } from './healthy.classes.healthyconfig';
import { IHealthyPackage } from './healthy.interfaces.HealthyPackage';

/**
 * Healthy class
 * expects a HealthyPackage on port 8765
 */
export class Healthy {
  private options: HealthyConfig;

  constructor(configArg: HealthyConfig) {
    this.options = configArg;
  }

  /**
   * performs a health check
   */
  public async doHealthCheck(): Promise<IHealthyPackage> {
    const timeout = new plugins.smarttime.Timer(2000);
    let timedOut = false;
    timeout.completed.then(() => {
      logger.log(
        'warn',
        'health check timed out! Therefore the service is considered unhealthy and healthcheck will fail!'
      );
      timedOut = true;
    });
    timeout.start();

    const response = await plugins.smartrequest.getJson('http://localhost:8765');
    timeout.reset(); // health chck completed in time, so lets stop here.

    const responseHealthPackage: IHealthyPackage = response.body;
    console.log(responseHealthPackage);

    let everythingOk = true;

    // lets perform health checks

    // selfAnalysis
    if (responseHealthPackage.serviceSelfAnalysis !== 'healthy') {
      logger.log(
        'warn',
        `selfAnalysis of the serverse states ${responseHealthPackage.serviceSelfAnalysis}!`
      );
      if (responseHealthPackage.serviceSelfAnalysis === 'unhealthy') {
        logger.log('warn', 'Therefore the healthcheck will fail!');
        process.exit(1);
      }
    }

    // ressourceusage

    const healthyPackage: IHealthyPackage = {
      cpuUsage: 0.1,
      gcRequested: true,
      timedOut, // short form that uses the value from above
      memoryUsage: 0,
      serviceSelfAnalysis: 'healthy',
    };
    return healthyPackage;
  }

  public async isHealthy(): Promise<boolean> {
    const result = this.doHealthCheck();

    // TODO: determine some rules for what is actually subject to failure
    return true;
  }
}
