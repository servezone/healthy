import * as plugins from './healthy.plugins';
import { Healthy } from './healthy.classes.healthy';
import { HealthyConfig } from './healthy.classes.healthyconfig';

const healthyCli = new plugins.smartcli.Smartcli();

healthyCli.standardTask().subscribe(argvArg => {
  const healthyConfig = new HealthyConfig();
  const healthy = new Healthy(healthyConfig);
});

healthyCli.startParse();
