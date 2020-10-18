declare namespace NodeJS {
  interface Global {
    applicationInstance: import('../main/App').default;
    testRequest: import('supertest').SuperTest<import('supertest').Test>;
    serverIntance: import('express').Application;
  }
}
