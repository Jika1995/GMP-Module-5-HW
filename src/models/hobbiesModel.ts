import { hobbies } from "../data/hobbies.js";

type updateHobbyData = {
  hobbies: string[];
}
export const getUserHobbies = (id: string) => {
  return new Promise((resolve, _reject) => {
    let userHobbies = hobbies.find((item) => item.id === id);
    if (!userHobbies) {
      hobbies.push({ id, hobbies: [] });
      resolve({ id, hobbies: [] })
      return;
    };
    resolve(userHobbies);
  });
};

export const updateHobbies = (hobbiesData: updateHobbyData, id: string) => {
  return new Promise((resolve, reject) => {
    const itemIdx = hobbies.findIndex((item) => item.id === id);
    hobbies[itemIdx] = { id, ...hobbiesData };
    resolve(hobbies[itemIdx])
  })
}