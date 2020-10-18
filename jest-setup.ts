import superTest from 'supertest';

import App from './src/main/App';

let app: App;

beforeAll(async () => {
  app = new App();
  await app.initApplication();
  global.applicationInstance = app;
  global.serverIntance = app.getServerInstance();
  global.testRequest = superTest(app.getServerInstance());
});

afterAll(async () => {
  await app.closeApplication();
});
