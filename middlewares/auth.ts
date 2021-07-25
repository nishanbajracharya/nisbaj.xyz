import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

import { verify } from '../lib/token';

const unauthorizedError = {
  code: 401,
  message: 'Unauthorized. Authorization header is not provided or is malformed. Header should begin with "Bearer " and should include valid jwt token.',
};

const authenticate = (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
  const headers = req.headers;

  const authorizationHeader = headers.authorization || '';

  if (!authorizationHeader || (authorizationHeader && authorizationHeader.indexOf('Bearer ') !== 0)) {
    res.status(401).json(unauthorizedError);
  }

  const token = authorizationHeader.replace('Bearer ', '');

  if (!token) {
    res.status(401).json(unauthorizedError);

    return;
  }

  try {
    verify(token);
    
    return handler(req, res);
  } catch(e) {
    res.status(401).json(unauthorizedError);
  }

};

export default authenticate;
