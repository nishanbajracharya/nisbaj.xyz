import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';

import * as http from '../../lib/http';
import { LOADING_STATUS } from '../../types/Loading';

export default function Blog() {
  const initialBlogs = (() => {
    try {
      return JSON.parse(window.localStorage.getItem('blogs') || '[]');
    } catch (e) {
      return [];
    }
  })();
  const [blogs, setBlogs] = useState<BlogSummary[]>(initialBlogs);

  const [loading, setLoading] = useState<LOADING_STATUS>(
    LOADING_STATUS.INITIAL
  );

  useEffect(() => {
    setLoading(LOADING_STATUS.LOADING);

    http
      .get('/api/blog')
      .then((response) => {
        setBlogs(response.data.data);
        setLoading(LOADING_STATUS.LOADED);
        window.localStorage.setItem(
          'blogs',
          JSON.stringify(response.data.data)
        );
      })
      .catch((e) => {
        setBlogs([]);
        setLoading(LOADING_STATUS.FAILED);
        window.localStorage.removeItem('blogs');
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
