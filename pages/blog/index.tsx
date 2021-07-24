import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Blog() {
  const [blogs, setBlogs] = useState<BlogSummary[]>([]);

  useEffect(() => {
    fetch('/api/blog')
      .then((response) => response.json())
      .then((response) => {
        setBlogs(response.data);
      });
  }, []);

  return (
    <>
      <Head>
        <title>nisbaj.xyz - Blog</title>
      </Head>
      <h2 className="font-semibold text-2xl my-4">Blog</h2>
      <div>
        {blogs &&
          blogs.length > 0 &&
          blogs.map((blog) => {
            return (
              <div key={blog._id} className="my-4">
                <Link href={`/blog/${blog.vanityId}`}>
                  <a
                    title={blog.title}
                    className="text-lg text-blue-500 hover:underline"
                  >
                    {blog.title}
                  </a>
                </Link>
                <p className="text-gray-600 dark:text-white">{blog.summary}</p>
                <p className="text-gray-400 text-sm">
                  Published Date:{' '}
                  <span>{new Date(blog.createdAt).toDateString()}</span>
                </p>
              </div>
            );
          })}
      </div>
    </>
  );
}
