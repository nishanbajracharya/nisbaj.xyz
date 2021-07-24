// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import connect from '../../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { blogId } = req.query;

    const { db } = await connect();

    const blog = await db.collection('blog').findOne({ vanityId: blogId });

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    res.status(200).json(blog);
  } catch (e) {
    res.status(500).json({
      status: 'Error',
    });
  }
}
