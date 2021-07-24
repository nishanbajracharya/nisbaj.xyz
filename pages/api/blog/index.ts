// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import * as blog from '../../../services/blog';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await blog.getAll();

    res.status(200).json({
      data,
      meta: {
        page: 1,
        pageCount: 5,
        pageSize: 2,
      },
    });
  } catch (e) {
    res.status(500).json({
      status: 'Error',
    });
  }
}

export default handler;
