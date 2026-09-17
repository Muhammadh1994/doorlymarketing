import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { AdSpaceSection } from "@/components/ad-space-section";
import { HowItWorks } from "@/components/how-it-works";
import { ReachStats } from "@/components/reach-stats";
import { WhyDirectMail } from "@/components/why-direct-mail";
import { LeadFormSection } from "@/components/lead-form-section";
import { SiteFooter } from "@/components/site-footer";
import { ScrollScene } from "@/components/scroll-scene";

export default function Home() {
  return (
    <>
      {/* Fixed full-page photographic backdrop (van -> mailboxes -> street ->
          door) that moves continuously with total scroll progress (Ken
          Burns per layer, blurred hand-offs between layers — see
          scroll-scene.tsx). Every section below renders directly on top of
          it now, with no card behind the copy; legibility comes from the
          scene's own paper wash plus the `.scene-copy` text-shadow halo
          used on body copy (see globals.css). */}
      <ScrollScene />
      <SiteHeader />
      <main className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-5 px-3 py-5 sm:gap-8 sm:px-6 sm:py-8 lg:gap-10 lg:px-10 lg:py-10">
        <Hero />
        <AdSpaceSection />
        <HowItWorks />
        <ReachStats />
        <WhyDirectMail />
        <LeadFormSection />
      </main>
      <div className="relative z-10 mx-auto max-w-[1400px] px-3 pb-5 sm:px-6 sm:pb-8 lg:px-10 lg:pb-10">
        <SiteFooter />
      </div>
    </>
  );
}
