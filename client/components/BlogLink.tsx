'use client';

import Link from 'next/link';

interface BlogLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function BlogLink({ href, className, children }: BlogLinkProps) {
  return (
    <Link 
      href={href} 
      className={className}
    >
      {children}
    </Link>
  );
}

