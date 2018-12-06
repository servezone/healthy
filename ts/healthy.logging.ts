import * as plugins from './healthy.plugins';

export const logger = new plugins.smartlog.Smartlog({
  logContext: {
    company: '',
    companyunit: '',
    containerName: '',
    environment: 'production',
    runtime: 'node',
    zone: ''
  },
  minimumLogLevel: 'info'
})