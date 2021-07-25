import { NextApiRequest, NextApiResponse } from 'next';

import authenticate from '../../../middlewares/auth';

function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ success: true });
}

export default authenticate(handler);
