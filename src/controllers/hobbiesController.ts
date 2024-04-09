import { getUserHobbies, updateHobbies } from "../models/hobbiesModel.js";
import { getOneById } from "../models/userModel.js";
import { parseRequestBody } from "../utils/utils.js";

export const getHobbies = async (req: any, res: any, id: string) => {
  try {
    const userHobbies: any = await getUserHobbies(id);

    const hobbiesWithLinks = {
      hobbies: userHobbies.hobbies,
      links: { self: `api/users/${ id }/hobbies`, user: `api/users/${ id }` }
    };
    res.statusCode = 200;
    res.end(JSON.stringify(hobbiesWithLinks));
  } catch (err) {
    console.log('getHobbiesErr', err);
  };
};

export const updateUserHobbies = async (req: any, res: any, id: string) => {
  try {
    const user = await getOneById(id);
    if (!user) {
      res.statusCode = 404;
      res.end(JSON.stringify({ message: `User with id ${ id } does not exist ` }));
    };

    const body: any = await parseRequestBody(req);

    const updatedHobbies = await updateHobbies(body, id);
    res.statusCode = 204;
    res.end(JSON.stringify({ message: ` User ${ id } hobbies updated`, user: updatedHobbies }));
  } catch (err) {
    console.log('updateHobbiesErr', err);
  }
}