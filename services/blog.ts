import connect from '../lib/db';

export async function getAll() {
  const { db } = await connect();

  const data: BlogSummary[] = await db
    .collection('blog')
    .find({})
    .project({ content: 0 })
    .toArray();

  return data;
}

export async function getByVanityId(id: string | string[]) {
  const { db } = await connect();

  const data = await db.collection('blog').findOne({ vanityId: id });

  return data;
}
