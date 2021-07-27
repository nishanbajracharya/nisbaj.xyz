import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { IoChevronBack } from 'react-icons/io5';

import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';

import { withAuth } from '../../../hoc/withAuth';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import http from '../../../lib/http';
import { LOADING_STATUS } from '../../../types/Loading';

function EditBlog() {
  const router = useRouter();
  const { blogId } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<LOADING_STATUS>(
    LOADING_STATUS.INITIAL
  );

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(LOADING_STATUS.INITIAL);

  useEffect(() => {
    if (blogId) {
      setLoading(LOADING_STATUS.LOADING);

      http
        .get(`/api/blog/${blogId}`)
        .then((response) => {
          setBlog(response.data);
          setTitle(response.data.title);
          setContent(response.data.content);
          setLoading(LOADING_STATUS.LOADED);
        })
        .catch((e) => {
          setBlog(null);
          setLoading(LOADING_STATUS.FAILED);
        });
    }
  }, [blogId]);

  function onSubmit() {
    setSubmitting(LOADING_STATUS.LOADING);

    http
      .put(
        `/api/management/blog/${blogId}`,
        {
          title: title,
          content: content,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        setSubmitting(LOADING_STATUS.LOADED);
      })
      .catch((error) => {
        setSubmitting(LOADING_STATUS.FAILED);
      });
  }

  if (
    !blog ||
    loading === LOADING_STATUS.LOADING ||
    loading === LOADING_STATUS.FAILED
  )
    return (
      <>
        <Head>
          <title>
            {loading === LOADING_STATUS.LOADING ? 'Loading' : ''}
            {loading === LOADING_STATUS.FAILED ? 'Blog not found' : ''}
          </title>
        </Head>
        <div className="my-4">
          <Link href="/management/blog">
            <a className="hover:text-blue-500 hover:underline text-gray-600 inline-flex justify-center items-center">
              <IoChevronBack className="mr-2" />
              Back
            </a>
          </Link>
          <h2 className="font-semibold text-2xl my-4">
            {loading === LOADING_STATUS.LOADING ? 'Loading' : ''}
            {loading === LOADING_STATUS.FAILED ? 'Blog not found' : ''}
          </h2>
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>{blog.title}</title>
      </Head>
      <div className="my-4">
        <Link href="/management/blog">
          <a className="hover:text-blue-500 hover:underline text-gray-600 inline-flex justify-center items-center">
            <IoChevronBack className="mr-2" />
            Back
          </a>
        </Link>
        <div>
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="p-4 rounded my-2 border w-full focus:ring outline-none"
          />
          <div className="h-96">
            <ReactQuill
              className="border dark:border-gray-700 rounded dark:bg-gray-600 h-96 h-full focus:ring"
              theme="bubble"
              value={content}
              onChange={setContent}
            />
          </div>
          <button
            className="flex justify-center items-center h-10 text-white bg-blue-500 rounded px-4 py-2 my-2 w-full my-4 hover:bg-blue-400 focus:outline-none focus:ring focus:bg-blue-600"
            type="button"
            onClick={onSubmit}
          >
            {submitting === LOADING_STATUS.LOADING ? (
              <svg className="animate-spin h-5 w-5" viewBox="0 0 40 40">
                <circle
                  strokeDasharray="64"
                  cx="20"
                  cy="20"
                  r="18"
                  className="fill-transparent stroke-current stroke-2 text-white"
                ></circle>
              </svg>
            ) : (
              'Update'
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default withAuth(EditBlog);
