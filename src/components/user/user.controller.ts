import { userService } from './user.service';
import { Request, Response } from 'express';
import { CreateUserDto, UpdateUserDto } from './user.types';

const getAllUsers = async (_req: Request, res: Response) => {
  res.json(await userService.getAll());
};

const getUserById = async (req: Request<{ id: string }>, res: Response) => {
  res.json(await userService.getById(req.params.id));
};

const createUser = async (
  req: Request<{}, {}, CreateUserDto>,
  res: Response
) => {
  res.status(201).json(await userService.create(req.body));
};

const updateUser = async (
  req: Request<{ id: string }, {}, UpdateUserDto>,
  res: Response
) => {
  res.json(await userService.update(req.params.id, req.body));
};

const deleteUser = async (req: Request<{ id: string }>, res: Response) => {
  await userService.deactivate(req.params.id);
  res.status(204).send();
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
