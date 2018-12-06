import { logger } from './healthy.logging';
import * as plugins from './healthy.plugins';

import { HealthyConfig } from './healthy.classes.healthyconfig';
import { IHealthyPackage } from './healthy.interfaces.HealthyPackage';

/**
 * Healthy class
 * expects a HealthyPackage on port 8765
 */
export class Healthy {
  options: HealthyConfig;

  constructor(configArg: HealthyConfig) {
    this.options = configArg;
  }

  /**
   * performs a health check
   */
  async doHealthCheck() {
    const timeout = new plugins.smarttime.Timer(2000);
    timeout.completed.then(() => {
      logger.log(
        'warn',
        'health check timed out! Therefore the service is considered unhealthy and healthcheck will fail!'
      );
      process.exit(1);
    });
    timeout.start();

    const response = await plugins.smartrequest.getJson(
      'http://localhost:8765'
    );
    timeout.reset(); // health chck completed in time, so lets stop here.

    const responseHealthPackage: IHealthyPackage = response.body;
    console.log(responseHealthPackage);

    let everythingOk = true;

    // lets perform health checks
    
    // selfAnalysis
    if (responseHealthPackage.serviceSelfAnalysis !== 'healthy') {
      logger.log(
        'warn',
        `selfAnalysis of the serverse states ${
          responseHealthPackage.serviceSelfAnalysis
        }!`
      );
      if (responseHealthPackage.serviceSelfAnalysis === 'unhealthy') {
        logger.log('warn', 'Therefore the healthcheck will fail!');
        process.exit(1);
      }
    }

    // ressourceusage
    
  }
}
