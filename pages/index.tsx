import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nisbaj.xyz</title>
        <meta name="description" content="Nisbaj's personal space" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="app-content">
        <h1>
          Welcome to <Link href="/">nisbaj.xyz</Link>
        </h1>
      </main>
    </div>
  );
}

Home.getLayout = () => ({
  noDecoration: true
});
