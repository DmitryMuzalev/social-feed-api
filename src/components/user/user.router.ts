import { Router } from 'express';
import userController from './user.controller';
import userValidation from './user.validation';

import { validate } from '@/middleware/validate';

const router = Router();

router.get('/', userController.getAllUsers);

router.get(
  '/:id',
  validate({ params: userValidation.userIdParamsSchema }),
  userController.getUserById
);

router.post(
  '/',
  validate({ body: userValidation.createUserBodySchema }),
  userController.createUser
);

router.put(
  '/:id',
  validate({
    params: userValidation.userIdParamsSchema,
    body: userValidation.updateUserBodySchema,
  }),
  userController.updateUser
);

router.delete(
  '/:id',
  validate({ params: userValidation.userIdParamsSchema }),
  userController.deleteUser
);
export default router;
