import { create, getOneById, remove, update } from "../models/userModel.js";
import { parseRequestBody } from "../utils/utils.js"
import { getAll } from "../models/userModel.js";
import { User } from "../types.js";

export const createUser = async (req: any, res: any) => {
  try {
    const body: any = await parseRequestBody(req);
    const newUser: any = await create(body);
    res.statusCode = 201;
    res.end(JSON.stringify({ message: 'User created', id: newUser.id }));
  } catch (err) {
    console.log('createUserErr', err);
  }
}

export const getUsers = async (req: any, res: any) => {
  try {
    const users: any = await getAll();
    const usersWithLinks = users.map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      links: { self: `api/users/${ user.id }`, hobbies: `api/users/${ user.id }/hobbies` }
    }));
    res.statusCode = 200;
    res.end(JSON.stringify(usersWithLinks));
  } catch (err) {
    console.log('getUsersErr', err);
  };
};

export const getUserById = async (req: any, res: any, id: string) => {
  try {
    try {
      const user: any = await getOneById(id);
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        links: { self: `api/users/${ user.id }`, hobbies: `api/users/${ user.id }/hobbies` }
      };
      res.statusCode = 200;
      res.end(JSON.stringify(userData));
    } catch (err) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'User not found' }));
    }
  } catch (err) {
    console.log('getUserById', err);
  }
};

export const updateUser = async (req: any, res: any, id: string) => {
  try {
    const user = await getOneById(id);

    if (!user) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'User not found' }));
    }
    const body: any = await parseRequestBody(req);
    const updatedUser: any = await update(id, body);
    console.log('updatedUser', updatedUser);
    res.statusCode = 204;
    return res.end(JSON.stringify({ message: ` User ${ id } updated`, user: updatedUser }));
  } catch (err) {
    console.log('updateUserErr', err);
  }
};


export const deleteUser = async (req: any, res: any, id: string) => {
  try {
    const user = await getOneById(id);
    console.log('found user', user)
    if (!user) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'User not found' }));
    }

    await remove(id);
    res.statusCode = 204;
    return res.end(JSON.stringify({ message: ` User ${ id } removed` }));
  } catch (err) {
    console.log('deleteUSerErr', err);
  }
}