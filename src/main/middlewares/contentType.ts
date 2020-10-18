import { Request, Response, NextFunction } from 'express';

export default (_req: Request, res: Response, next: NextFunction): void => {
  res.type('application/json');
  next();
};
