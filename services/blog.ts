import connect from '../lib/db';

export async function getAll(page: number, pageSize: number) {
  const { db } = await connect();

  const pageStart = page - 1;
  const cursorStart = pageStart * pageSize;

  const data: BlogSummary[] = await db
    .collection('blog')
    .find({})
    .skip(cursorStart)
    .limit(pageSize)
    .project({ content: 0 })
    .toArray();

  return data;
}

export async function getByVanityId(id: string | string[]) {
  const { db } = await connect();

  const data = await db.collection('blog').findOne({ vanityId: id });

  return data;
}

export async function getCount() {
  const { db } = await connect();

  const count = await db.collection('blog').countDocuments();

  return count;
}
