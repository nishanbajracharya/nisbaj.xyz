// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import * as blog from '../../../services/blog';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pagesize) || 10;

    const data = await blog.getAll(page, pageSize);

    const count = await blog.getCount();

    const pageCount = Math.ceil(count / pageSize);

    res.status(200).json({
      data,
      meta: {
        page,
        pageSize,
        pageCount,
      },
    });
  } catch (e) {
    res.status(500).json({
      e,
      status: 'Error',
    });
  }
}

export default handler;
