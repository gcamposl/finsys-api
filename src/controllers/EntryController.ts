import { Router, Request, Response } from 'express';

const entryRoutes = Router();

entryRoutes.get('/', (request, response) => response.json({ message: 'teste' }));

entryRoutes.post('/', async (request: Request, response: Response): Promise<any> => {
  console.log(request.body);
  return response.json({ reqBody: request.body });
  const { name, value } = request.body;
  if (name && value) {
    return response.json({ message: `name: ${name} | valor: ${value}` });
  }
  return response.json({ message: 'ERRO' });
});

export default entryRoutes;
