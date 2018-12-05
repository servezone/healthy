import { expect, tap } from '@pushrocks/tapbundle';
import * as healthy from '../ts/index';

let testHealthy: healthy.Healthy;

tap.test('should produce a healthy class', async () => {
  testHealthy = new healthy.Healthy();
  expect(testHealthy).to.be.instanceOf(healthy.Healthy);
})

tap.test('should create a health check', async () => {
  testHealthy.doHealthCheck();
})

tap.start();
