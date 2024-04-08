export const parseRequestBody = (req: any) => new Promise((resolve, reject) => {
  let body = '';

  req.on('data', (chunk: any) => {
    body += chunk.toString();
  });

  req.on('end', () => {
    resolve(JSON.parse(body));
  });

  req.on('error', (error: Error) => {
    reject(error);
  });
});
