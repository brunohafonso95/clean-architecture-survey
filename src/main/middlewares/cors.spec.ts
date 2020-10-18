describe('Cors Middleware', () => {
  it('should enable the cors', async () => {
    global.serverIntance.get('/test_cors', (_req, res) => res.send());

    await global.testRequest
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*');
  });
});
