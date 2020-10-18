import { Request, Response } from 'express';

describe('BodyParser middleware', () => {
  it('should return the sended payload as json', async () => {
    global.serverIntance.post(
      '/body_parser_test',
      (req: Request, res: Response) => res.json({ ...req.body }),
    );
    const payload = {
      msg: 'payload_test',
    };

    await global.testRequest
      .post('/body_parser_test')
      .send(payload)
      .expect(payload);
  });
});
