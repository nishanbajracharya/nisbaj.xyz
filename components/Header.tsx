import Link from 'next/link';

export default function Header() {
  return <header className="app-content">
    <Link
      href="/"
    >
      <a title="Home">nisbaj.xyz</a>
    </Link>
    <div>Menu</div>
  </header>;
}