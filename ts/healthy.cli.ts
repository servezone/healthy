import * as plugins from './healthy.plugins';
import { Healthy } from './healthy.classes.healthy';
import { HealthyConfig } from './healthy.classes.healthyconfig';

const healthyCli = new plugins.smartcli.Smartcli();

healthyCli.standardTask().subscribe(async argvArg => {
  const healthyConfig = new HealthyConfig();
  const healthy = new Healthy(healthyConfig);
  if(await healthy.isHealthy()) {
    process.exit(0);
  } else {
    process.exit(1); // the exit code signals to docker that something is wrong.
  }
});

healthyCli.startParse();
