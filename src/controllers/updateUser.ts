import { getOneById, update } from "../models/userModel.js";
import { parseRequestBody } from "../utils/utils.js";

export const updateUser = async (req: any, res: any, id: string) => {
  try {
    const user = await getOneById(id);

    if (!user) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'User not found' }));
    }
    const body: any = await parseRequestBody(req);

    const updatedUser = await update(body);
    res.statusCode = 204;
    res.end(JSON.stringify({ message: ` User ${ id } updated`, user: updatedUser }));
  } catch (err) {
    console.log('updateUserErr', err);
  }
}