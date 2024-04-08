import { create } from "../models/userModel.js";
import { parseRequestBody } from "../utils/utils.js"

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