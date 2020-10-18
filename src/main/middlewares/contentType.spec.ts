describe('ContentType Middleware', () => {
  it('should return default contentType to application/json', async () => {
    global.serverIntance.get('/test_content_type', (_req, res) => res.send());

    await global.testRequest
      .get('/test_content_type')
      .expect('content-type', /json/);
  });

  it('should return xml content type when forced', async () => {
    global.serverIntance.get('/test_content_type_xml', (_req, res) => {
      res.type('application/xml');
      res.send();
    });

    await global.testRequest
      .get('/test_content_type_xml')
      .expect('content-type', /xml/);
  });
});
