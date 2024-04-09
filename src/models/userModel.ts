import { User } from "../types.js";
import { users } from "../data/users.js";
import { randomUUID } from "crypto";

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
    id: randomUUID(),
    ...user
  };

  return new Promise((resolve, _reject) => {
    users.push(newUser);
    resolve(newUser);
  })
}

export const update = (id: string, user: Omit<User, 'id'>) => {
  return new Promise((resolve, _reject) => {
    const userIdx = users.findIndex((u: User) => u.id === id);
    console.log('found index', userIdx)
    users[userIdx] = { id, ...user };
    resolve(users[userIdx]);
  });
};

export const remove = (id: string) => {
  return new Promise((resolve, reject) => {
    const userIdx = users.findIndex((u: User) => u.id === id);
    users.splice(userIdx, 1);
    resolve(users);
  });
};