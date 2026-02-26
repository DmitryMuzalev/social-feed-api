import { Request, Response } from 'express';

import { User } from './user.types';

const users: User[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
  },
  {
    id: 3,
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
  },
];

const getAllUsers = (req: Request, res: Response) => {
  res.json(users);
};

const getUserById = (req: Request, res: Response) => {
  const id = +req.params.id;
  const user = users.find((user) => user.id === id);

  if (!user) throw new Error('Nothing found');

  res.json(user);
};

const createUser = (req: Request, res: Response) => {
  const newUser: User = req.body;
  newUser.id = (users.at(-1)?.id || 0) + 1;
  users.push(newUser);

  res.status(201).json(newUser);
};

const updateUser = (req: Request, res: Response) => {
  const id = +req.params.id;
  const updateUser: User = req.body;

  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex < 0) throw new Error('Nothing found');

  users[userIndex] = updateUser;

  res.json(updateUser);
};

const deleteUser = (req: Request, res: Response) => {
  const id = +req.params.id;
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex < 0) throw new Error('Nothing found');

  users.splice(userIndex, 1);

  res.status(200).send();
};

export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
