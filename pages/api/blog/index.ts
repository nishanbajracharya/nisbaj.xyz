// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: BlogItemSummary[];
  meta: {
    page: number;
    pageCount: number;
    pageSize: number;
  };
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    data: [
      {
        title: 'First Blog',
        id: '1234567890',
        summary: 'A summary',
        createdAt: 1234534534469,
      },
      {
        title: 'Second Blog',
        id: 'abcd-1234',
        summary: 'Another summary',
        createdAt: 1345323454690,
      },
    ],
    meta: {
      page: 1,
      pageCount: 5,
      pageSize: 2,
    },
  });
}
