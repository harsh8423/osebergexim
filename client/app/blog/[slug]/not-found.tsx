import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { OsebergHeader } from '@/components/OsebergHeader';
import { OsebergFooter } from '@/components/OsebergFooter';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F7F8FA]">
      <OsebergHeader />
      
      <div className="container mx-auto px-6 py-32 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-6xl font-bold text-[#1D3557] mb-6">404</h1>
          <h2 className="text-3xl font-semibold text-[#1D3557] mb-4">
            Blog Post Not Found
          </h2>
          <p className="text-xl text-[#5D7183] mb-8">
            The blog post you're looking for doesn't exist or may have been removed.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5D7183] to-[#7EA8BE] text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>
      </div>

      <OsebergFooter />
    </div>
  );
}
