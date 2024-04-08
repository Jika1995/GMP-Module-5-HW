import { v4 } from "uuid";
import { User } from "../utils/types.js";
import { users } from "../data/users.js";

export const getAll = () => {
  return new Promise((resolve, _reject) => {
    resolve(users);
  });
};

export const getOneById = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((u: User) => u.id === id);

    if (!user)
      reject(new Error('User not found'));

    resolve(user);
  });
};

export const create = (user: Omit<User, 'id'>) => {
  const newUser = {
    id: v4(),
    ...user
  };

  return new Promise((resolve, _reject) => {
    users.push(newUser);
    resolve(newUser);
  })
}

export const update = (user: User) => {
  return new Promise((resolve, reject) => {
    const userIdx = users.findIndex((u: User) => u.id === user.id);
    if (!userIdx)
      reject(new Error('User not found!'));

    users[userIdx] = { ...user };
    resolve(users[userIdx]);
  });
};

export const remove = (id: string) => {
  return new Promise((resolve, reject) => {
    const user = users.find((u: User) => u.id === id);

    if (!user)
      reject(new Error('User not found'));

    const usersData = users.filter((u: User) => u.id !== id);
    resolve(usersData);
  });
};