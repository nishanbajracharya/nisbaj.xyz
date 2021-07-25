// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import { encode } from '../../../lib/token';
import { findUser, validatePassword } from '../../../lib/user';

type Response =
  | {
      token: string;
    }
  | APIError;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  switch (req.method) {
    case 'POST':
      const body = req.body;

      return findUser({ username: body.username })
        .then((user) => {
          if (user && validatePassword(user, body.password)) {
            const token = encode({
              username: user.username,
              createdAt: user.createdAt,
            });

            res.status(200).json({
              token,
            });
          } else {
            throw new Error();
          }
        })
        .catch(() => {
          res
            .status(401)
            .json({ code: 401, message: 'Invalid username or password.' });
        });
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
