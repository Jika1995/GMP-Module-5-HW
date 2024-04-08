import { getAll } from "../models/userModel.js";
import { User } from "../utils/types.js";

export const getUsers = async (req: any, res: any) => {
  try {
    const users: any = await getAll();
    const usersWithLinks = users.map((user: User) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      links: [{ self: `api/users/${ user.id }`, hobbies: `api/users/${ user.id }/hobbies` }]
    }));
    res.statusCode = 200;
    res.end(JSON.stringify(usersWithLinks));
  } catch (err) {
    console.log('getUsersErr', err);
  };
};