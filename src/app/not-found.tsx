import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center"
      style={{ background: 'linear-gradient(140deg, #0a0806 0%, #1a1208 45%, #2a1d0a 100%)' }}>
      <p className="text-8xl font-display font-bold text-brand mb-4">404</p>
      <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-white/60 mb-8">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/"
        className="bg-brand hover:bg-brand-light text-white font-semibold px-6 py-3 rounded-lg transition-colors no-underline">
        Go Home
      </Link>
    </div>
  );
}
