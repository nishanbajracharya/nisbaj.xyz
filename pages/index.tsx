import Head from 'next/head';
import Link from 'next/link';
import { IoMail } from 'react-icons/io5';
import { IoLogoGithub } from 'react-icons/io5';

import classnames from 'classnames';
import { useState, useEffect } from 'react';

const links = [
  {
    title: 'Github',
    url: 'https://www.github.com/nishanbajracharya',
    icon: IoLogoGithub,
  },
  {
    title: 'Email',
    url: 'mailto:nisbaj11@gmail.com',
    icon: IoMail,
  },
];

export default function Home() {
  const [animationStart, setAnimationStart] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimationStart(true), 500);
  }, []);

  return (
    <div>
      <Head>
        <title>nisbaj.xyz</title>
        <meta name="description" content="Nisbaj's personal space" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen">
        <h1
          className={classnames(
            'text-5xl font-semibold text-center transition transform duration-1000 opacity-0',
            {
              '-translate-y-16 opacity-100': animationStart,
            }
          )}
        >
          Welcome to{' '}
          <Link href="/">
            <a title="Home" className="font-mono text-blue-500 hover:underline">
              nisbaj.xyz
            </a>
          </Link>
        </h1>

        <div
          className={classnames(
            'flex transition transform duration-1000 delay-500 opacity-0',
            {
              '-translate-y-12 opacity-100': animationStart,
            }
          )}
        >
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <a
                className="flex flex-col justify-center items-center text-center m-4 hover:text-blue-500 hover:underline"
                target="_blank"
                rel="noreferrer noopener"
                href={link.url}
                title={link.title}
                key={link.url}
              >
                <Icon size={32} />
                <span>{link.title}</span>
              </a>
            );
          })}
        </div>
      </main>
    </div>
  );
}

Home.getLayout = () => ({
  noDecoration: true,
});
