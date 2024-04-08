import { getUserHobbies } from "../models/hobbiesModel.js";
import { HobbyData } from "../utils/types.js";

export const getHobbies = async (req: any, res: any, id: string) => {
  try {
    const hobbies: any = await getUserHobbies(id);

    const hobbiesWithLinks = hobbies.map((item: HobbyData) => ({
      hobbies: item.hobbies,
      links: [{ self: `api/users/${ id }/hobbies`, user: `api/users/${ id }` }]
    }));
    res.statusCode = 200;
    res.end(JSON.stringify(hobbiesWithLinks));
  } catch (err) {
    console.log('getHobbiesErr', err);
  };
}