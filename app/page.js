import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Explore from "./components/Explore";
import Collections from "./components/Collections";
import Premium from "./components/Premium";
import Testimonials from "./components/Testimonials";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import ContactFloat from "./components/ContactFloat";

export default function Home() {
  return (
    <main>
      <TopBanner />
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <Explore />
      <Collections />
      <Premium />
      <Testimonials />
      <Newsletter />
      <Footer />
      <ContactFloat />
    </main>
  );
}
