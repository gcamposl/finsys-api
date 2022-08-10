import { Router } from 'express';

const entryRoutes = Router();

entryRoutes.post('/teste', (request, response) => {
  const { name, value } = request.body;
  if (name && value) {
    return response.json({ message: `name: ${name} | valor: ${value}` });
  }
  return response.json({ message: 'ERRO' });
});

export default entryRoutes;
