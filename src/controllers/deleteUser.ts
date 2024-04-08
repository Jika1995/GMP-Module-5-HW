import { getOneById, remove } from "../models/userModel.js";

export const deleteUser = async (req: any, res: any, id: string) => {
  try {
    const user = await getOneById(id);

    if (!user) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: 'User not found' }));
    }

    await remove(id);
    res.statusCode = 204;
    res.end(JSON.stringify({ message: ` User ${ id } removed` }));
  } catch (err) {
    console.log('deleteUSerErr', err);
  }
}