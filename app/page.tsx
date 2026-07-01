import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Works from "@/components/Works";
import NewsSection from "@/components/News";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { getServices, getWorks, getPublishedNews } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [services, works, news] = await Promise.all([
    getServices(),
    getWorks(),
    getPublishedNews(),
  ]);

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Services items={services} />
        <About />
        <Works items={works} />
        <NewsSection items={news} />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
