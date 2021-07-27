import { useState } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.bubble.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import http from '../../../lib/http';
import { withAuth } from '../../../hoc/withAuth';
import { LOADING_STATUS } from '../../../types/Loading';

function NewBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(LOADING_STATUS.INITIAL);

  function onSubmit() {
    setSubmitting(LOADING_STATUS.LOADING);

    http
      .post(
        '/api/management/blog',
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

  return (
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
          'Create'
        )}
      </button>
    </div>
  );
}

export default withAuth(NewBlog);
