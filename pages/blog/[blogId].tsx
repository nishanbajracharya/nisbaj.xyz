import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

import { IoChevronBack } from 'react-icons/io5';

function Blog() {
  const router = useRouter();
  const { blogId } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (blogId) {
      setLoading(true);
      fetch(`/api/blog/${blogId}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return response.json().then((data) => {
            throw new Error(data);
          });
        })
        .then((response) => {
          if (response) {
            setBlog(response);
          }
        })
        .catch((e) => setBlog(null))
        .finally(() => setLoading(false));
    }
  }, [blogId]);

  if (!blog)
    return (
      <>
        <Head>
          <title>{loading ? 'Loading' : 'Blog not found'}</title>
        </Head>
        <div className="my-4">
          <Link href="/blog">
            <a className="hover:text-blue-500 hover:underline text-gray-600 inline-flex justify-center items-center">
              <IoChevronBack className="mr-2" />
              Back
            </a>
          </Link>
          <h2 className="font-semibold text-2xl my-4">{loading ? 'Loading Blog' : 'Blog not found'}</h2>
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <div className="my-4">
        <Link href="/blog">
          <a className="hover:text-blue-500 hover:underline text-gray-600 inline-flex justify-center items-center">
            <IoChevronBack className="mr-2" />
            Back
          </a>
        </Link>
        <h2 className="font-semibold text-2xl my-4">{blog.title}</h2>
        <p className="my-4">{blog.content}</p>
      </div>
    </>
  );
}

export default Blog;
