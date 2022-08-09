import express from 'express';

import { processRequestBody } from 'zod-express-middleware';
import requireUser from '../../middleware/requireUser';

import { getCurrentUserHandler, registerUserHandler } from './user.controller';
import { registerUserSchema } from './user.schema';

const router = express.Router();

router.get('/', requireUser, (req, res) => {
  return res.send(res.locals.user);
});

router.post('/', registerUserHandler);

router.get("/me", requireUser, getCurrentUserHandler);

export default router;
