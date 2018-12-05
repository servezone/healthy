import * as plugins from './healthy.plugins';

const healthyCli = new plugins.smartcli.Smartcli();

healthyCli.standardTask().subscribe((argvArg) => {
  argvArg
});

healthyCli.startParse();