// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import connect from '../../../lib/db';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { db } = await connect();
    const data: BlogSummary[] = await db
      .collection('blog')
      .find({})
      .project({ content: 0 })
      .toArray();

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
