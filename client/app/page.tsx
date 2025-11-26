"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { AIChat } from "@/components/AIChat";
import { Blog } from "@/components/Blog";
import { BlogPost } from "@/components/BlogPost";
import { CatalogOverview } from "@/components/CatalogOverview";
import { GlobalMap } from "@/components/GlobalMap";
import { OsebergAbout } from "@/components/OsebergAbout";
import { OsebergContact } from "@/components/OsebergContact";
import { OsebergFooter } from "@/components/OsebergFooter";
import { OsebergHeader } from "@/components/OsebergHeader";
import { OsebergHero } from "@/components/OsebergHero";
import { OsebergProducts } from "@/components/OsebergProducts";
import { OsebergServices } from "@/components/OsebergServices";
import { PageLoader } from "@/components/PageLoader";
import { QuotePopup } from "@/components/QuotePopup";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Testimonials } from "@/components/Testimonials";
import { TrustBadges } from "@/components/TrustBadges";
type Page = "home" | "catalog" | "blog-post";

export default function HomePage() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [currentBlogPostId, setCurrentBlogPostId] = useState<string | null>(
    null,
  );

  const navigateToProduct = (slug: string) => {
    router.push(`/catalog/${slug}`);
  };

  const navigateToCatalog = () => {
    router.push('/catalog');
  };

  const navigateToHome = () => {
    router.push('/');
  };

  const navigateToBlogPost = (postId: string) => {
    setCurrentPage("blog-post");
    setCurrentBlogPostId(postId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <PageLoader />
      <div className="min-h-screen bg-background overflow-x-hidden">
        <ScrollProgress />

        {currentPage === "home" && (
          <>
            <OsebergHeader
              onNavigateToProduct={navigateToProduct}
              onNavigateToCatalog={navigateToCatalog}
            />
            <main>
              <OsebergHero />
              <TrustBadges />
              <OsebergProducts
                onNavigateToProduct={navigateToProduct}
                onNavigateToCatalog={navigateToCatalog}
              />
              <OsebergAbout />
              <OsebergServices />
              <Testimonials />
              <GlobalMap />
              <Blog onNavigateToPost={navigateToBlogPost} />
              <OsebergContact />
            </main>
            <OsebergFooter />
          </>
        )}



        {currentPage === "blog-post" && currentBlogPostId && (
          <>
            <OsebergHeader
              onNavigateToProduct={navigateToProduct}
              onNavigateToCatalog={navigateToCatalog}
            />
            <BlogPost postId={currentBlogPostId} onBack={navigateToHome} />
            <OsebergFooter />
          </>
        )}

        <AIChat />
        <QuotePopup />
      </div>
    </>
  );
}


