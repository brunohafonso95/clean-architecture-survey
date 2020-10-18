import { Request, Response } from 'express';

import IHttpResponse from '@presentation/interfaces/IHttpResponse';
import IController from '@presentation/interfaces/IController';

export default (
  controller: IController,
): ((req: Request, res: Response) => Promise<void>) => {
  return async function (req: Request, res: Response): Promise<void> {
    const response: IHttpResponse = await controller.handle({ body: req.body });
    if (response.body instanceof Error) {
      res.status(response.statusCode).json(response.body.message);
      return;
    }
    res.status(response.statusCode).json(response.body);
  };
};
