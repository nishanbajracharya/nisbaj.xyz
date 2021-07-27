import Head from 'next/head';
import Link from 'next/link';
import parse, { DOMNode, Element } from 'html-react-parser';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { IoChevronBack } from 'react-icons/io5';

import http from '../../lib/http';
import { LOADING_STATUS } from '../../types/Loading';

const isElement = (domNode: DOMNode): domNode is Element => {
  const isTag = domNode.type === 'tag';
  const hasAttributes = (domNode as Element).attribs !== undefined;

  return isTag && hasAttributes;
};

function Blog() {
  const router = useRouter();
  const { blogId } = router.query;

  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<LOADING_STATUS>(
    LOADING_STATUS.INITIAL
  );

  function renderBlog(content: string = '') {
    return parse(content, {
      replace: (node) => {
        if (
          isElement(node) &&
          node.name === 'p' &&
          node.children &&
          node.children.length === 1 &&
          isElement(node.children[0]) &&
          node.children[0].name === 'br'
        ) {
          return <></>;
        }

        return;
      },
    });
  }

  useEffect(() => {
    if (blogId) {
      setLoading(LOADING_STATUS.LOADING);

      http
        .get(`/api/blog/${blogId}`)
        .then((response) => {
          setBlog(response.data);
          setLoading(LOADING_STATUS.LOADED);
        })
        .catch((e) => {
          setBlog(null);
          setLoading(LOADING_STATUS.FAILED);
        });
    }
  }, [blogId]);

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
          <Link href="/blog">
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
        <Link href="/blog">
          <a className="hover:text-blue-500 hover:underline text-gray-600 inline-flex justify-center items-center">
            <IoChevronBack className="mr-2" />
            Back
          </a>
        </Link>
        <h2 className="font-semibold text-2xl my-4">{blog.title}</h2>
        <div className="my-4 unreset">{renderBlog(blog.content)}</div>
      </div>
    </>
  );
}

export default Blog;
