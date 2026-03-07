import { Request, Response } from 'express';
import { userService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './user.types';
import { HttpError } from '@/common/errors';

const handleError = (res: Response, error: unknown) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

const getAllUsers = async (_req: Request, res: Response) => {
  try {
    res.json(await userService.getAll());
  } catch (e) {
    handleError(res, e);
  }
};

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    res.json(await userService.getById(req.params.id));
  } catch (e) {
    handleError(res, e);
  }
};

const createUser = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response
) => {
  try {
    res.status(201).json(await userService.create(req.body));
  } catch (e) {
    handleError(res, e);
  }
};

const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserDto>,
  res: Response
) => {
  try {
    res.json(await userService.update(req.params.id, req.body));
  } catch (e) {
    handleError(res, e);
  }
};

const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  try {
    await userService.deactivate(req.params.id);
    res.status(204).send();
  } catch (e) {
    handleError(res, e);
  }
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
