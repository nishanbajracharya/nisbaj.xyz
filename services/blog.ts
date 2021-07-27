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

export async function create(data: BlogEntity) {
  const { db } = await connect();

  const createdAt = Date.now();

  const vanityId =
    data.title.toLowerCase().split(' ').join('-') + '-' + createdAt;

  const summary = (data.content || '')
    .replace(/<[^>]+>/g, ' ')
    .substr(0, 200)
    .trim();

  const result = await db.collection('blog').insertOne({
    ...data,
    createdAt,
    vanityId,
    summary,
    updatedAt: createdAt,
  });

  return result;
}

export async function update(blogId: string, data: BlogEntity) {
  const { db } = await connect();

  const updatedAt = Date.now();

  const summary = (data.content || '')
    .replace(/<[^>]+>/g, ' ')
    .substr(0, 200)
    .trim();

  const result = await db.collection('blog').updateOne(
    { vanityId: blogId },
    {
      $set: {
        ...data,
        updatedAt,
        summary,
      },
    }
  );

  return result;
}

export async function deleteBlog(blogId: string) {
  const { db } = await connect();

  const result = await db.collection('blog').deleteOne({ vanityId: blogId });

  return result;
}
