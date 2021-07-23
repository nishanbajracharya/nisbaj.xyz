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

      <main className="container mx-auto p-4 flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-5xl font-semibold text-center">
          Welcome to <Link href="/"><a title="Home" className="text-blue-500 hover:underline">nisbaj.xyz</a></Link>
        </h1>
      </main>
    </div>
  );
}

Home.getLayout = () => ({
  noDecoration: true
});
