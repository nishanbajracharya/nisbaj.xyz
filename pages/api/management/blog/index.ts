import { NextApiRequest, NextApiResponse } from 'next';

import authenticate from '../../../../middlewares/auth';
import { create } from '../../../../services/blog';

function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const body = req.body;

      return create(body)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch(() => {
          res
            .status(401)
            .json({ code: 401, message: 'Unauthorized' });
        });
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler);
