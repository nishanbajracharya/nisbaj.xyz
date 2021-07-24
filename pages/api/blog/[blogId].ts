// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

const data = [
  {
    title: 'First Blog',
    id: '1234567890',
    content: 'A summary',
    createdAt: 1234534534469,
  },
  {
    title: 'Second Blog',
    id: 'abcd-1234',
    content: 'Another summary',
    createdAt: 1345323454690,
  },
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Blog | Error404>
) {
  const { blogId } = req.query;

  const blog = data.find((item) => item.id === blogId);

  if (!blog) {
    res.status(404).json({ message: 'Blog not found' });
    return;
  }

  res.status(200).json(blog);
}
