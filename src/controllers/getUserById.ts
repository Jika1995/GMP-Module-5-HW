import { getOneById } from "../models/userModel.js";

export const getUserById = async (req: any, res: any, id: string) => {
  try {
    try {
      const user: any = await getOneById(id);
      const userData = {
        id: user.id,
        name: user.name,
        email: user.email,
        links: [{ self: `api/users/${ user.id }`, hobbies: `api/users/${ user.id }/hobbies` }]
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
}