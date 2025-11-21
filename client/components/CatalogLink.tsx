'use client';

import Link from 'next/link';

interface CatalogLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function CatalogLink({ href, className, children }: CatalogLinkProps) {
  return (
    <Link 
      href={href} 
      className={className}
    >
      {children}
    </Link>
  );
}

