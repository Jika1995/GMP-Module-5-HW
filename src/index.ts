import { createServer } from "http";
import { parse } from 'url';
import { createUser, deleteUser, getUsers, getUserById, updateUser } from "./controllers/userController.js";
import { getHobbies, updateUserHobbies } from "./controllers/HobbiesController.js";

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

  if (!pathArray || pathArray.length === 0) return console.log('No path');
  // Set headers
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && pathArray[0] === 'users' && !pathArray[2]) {
    if (pathArray[1]) {
      const id = pathArray[1];
      await getUserById(req, res, id)
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 's-maxage=3600, public');
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
  } else if (req.method === 'PATCH' && pathArray[0] === 'users' && pathArray[2] === 'hobbies') {
    const id = pathArray[1];
    await updateUserHobbies(req, res, id);
  } else if (req.method === 'GET' && pathArray[0] === 'users' && pathArray[2] === 'hobbies') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=3600, private');
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
