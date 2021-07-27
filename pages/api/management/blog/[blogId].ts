import { NextApiRequest, NextApiResponse } from 'next';

import authenticate from '../../../../middlewares/auth';
import { deleteBlog, update } from '../../../../services/blog';

function handler(req: NextApiRequest, res: NextApiResponse) {
  const { blogId } = req.query;
  switch (req.method) {
    case 'PUT':
      const body = req.body;

      return update(blogId.toString(), body)
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((e) => {
          res.status(401).json({ code: 401, message: 'Unauthorized' });
        });
    case 'DELETE':
      return deleteBlog(blogId.toString())
        .then((response) => {
          res.status(200).json(response);
        })
        .catch((e) => {
          res.status(401).json({ code: 401, message: 'Unauthorized' });
        });
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticate(handler);
