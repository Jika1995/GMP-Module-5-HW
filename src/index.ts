import { createServer } from "http";
import { parse } from 'url';
import { createUser } from "./controllers/createUser.js";
import { deleteUser } from "./controllers/deleteUser.js";
import { getHobbies } from "./controllers/getHobbies.js";
import { getUserById } from "./controllers/getUserById.js";
import { getUsers } from "./controllers/getUsers.js";
import { updateUserHobbies } from "./controllers/updateHobbies.js";
import { updateUser } from "./controllers/updateUser.js";

const port = 8000;

// Create HTTP server
const server = createServer(async (req: any, res: any) => {
  // Parse request url
  const parsedUrl = parse(req.url, true);
  // Get the pathname
  const pathname = parsedUrl.pathname;
  // Trim leading and trailing slashes
  const trimmedPath = pathname?.replace(/^\/+|\/+$/g, '');
  // Split the path
  const pathArray = trimmedPath?.split('/');

  if (!pathArray) return console.log('No path');
  // Set headers
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && pathArray[0] === 'users') {
    if (pathArray[1]) {
      const id = pathArray[1];
      await getUserById(req, res, id)
    } else {
      await getUsers(req, res);
    }
  } else if (req.method === 'POST' && pathArray[0] === 'users') {
    await createUser(req, res);
  } else if (req.method === 'PUT' && pathArray[0] === 'users') {
    const id = pathArray[1];
    await updateUser(req, res, id)
  } else if (req.method === 'DELETE' && pathArray[0] === 'users') {
    const id = pathArray[1];
    await deleteUser(req, res, id)
  } else if (req.method === 'PATCH' && pathArray[2] === 'hobbies') {
    const id = pathArray[1];
    await updateUserHobbies(req, res, id);
  } else if (req.method === 'GET' && pathArray[2] === 'hobbies') {
    const id = pathArray[1];
    await getHobbies(req, res, id);
  } else {
    // Unhandled route
    res.statusCode = 404;
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

// Start the server
server.listen(port, () => console.log(`Server running on port ${ port }`));
