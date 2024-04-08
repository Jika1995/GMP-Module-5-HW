import { hobbies } from "../data/hobbies.js";

type updateHobbyData = {
  hobbies: string[];
}
export const getUserHobbies = (id: string) => {
  return new Promise((resolve, _reject) => {
    const userHobbies = hobbies.find((item) => item.id === id)
    resolve(userHobbies?.hobbies);
  });
};

export const updateHobbies = (hobbiesData: updateHobbyData, id: string) => {
  return new Promise((resolve, reject) => {
    const itemIdx = hobbies.findIndex((item) => item.id === id);
    hobbies[itemIdx] = { id, ...hobbiesData };
    resolve(hobbies[itemIdx])
  })
}