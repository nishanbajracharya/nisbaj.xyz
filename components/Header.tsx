import Link from 'next/link';

export default function Header() {
  return <header className="shadow">
    <div className="container mx-auto p-4 flex justify-between items-center">
      <Link
        href="/"
      >
        <a title="Home" className="text-blue-500 hover:underline">nisbaj.xyz</a>
      </Link>
      <div>Menu</div>
    </div>
  </header>;
}
