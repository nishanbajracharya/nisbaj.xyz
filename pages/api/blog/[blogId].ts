// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import * as blog from '../../../services/blog';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { blogId } = req.query;

    const data = await blog.getByVanityId(blogId);

    if (!data) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({
      status: 'Error',
    });
  }
}
