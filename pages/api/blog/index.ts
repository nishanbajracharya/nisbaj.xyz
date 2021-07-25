// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

import * as blog from '../../../services/blog';

type Response = {
  data: BlogSummary[];
  meta: {
    page: number;
    pageSize: number;
    pageCount: number;
    blogCount: number;
  };
};

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | APIError>
) {
  try {
    const page = Number(req.query.page) || 1;
    const pageSize = Number(req.query.pagesize) || 10;

    const data = await blog.getAll(page, pageSize);

    const blogCount = await blog.getCount();

    const pageCount = Math.ceil(blogCount / pageSize);

    res.status(200).json({
      data,
      meta: {
        page,
        pageSize,
        pageCount,
        blogCount,
      },
    });
  } catch (e) {
    res.status(500).json({
      code: 500,
      status: 'Error',
      message: e.message,
    });
  }
}

export default handler;
