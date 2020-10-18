import { Router } from 'express';

import expressRouteAdapter from '../adapters/expressRouteAdapter';

import { signupFactoryController } from '../factories';

const routes = Router();

routes.post('/signup', expressRouteAdapter(signupFactoryController()));

export default routes;
