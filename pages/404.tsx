import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
        <meta name="description" content="Nisbaj's personal space" />
        <link rel="icon" href="/favicon.ico" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <div className="flex justify-center items-center mt-32">
        <div>
          <h1 className="leading-normal inline-block border-r py-0 px-2 text-xl font-semibold align-top md:text-2xl">
            404
          </h1>
          <div className="align-middle inline-block py-0 px-2 md:py-0.5">
            <h2 className="leading-loose">This page could not be found.</h2>
          </div>
        </div>
      </div>
    </>
  );
}
