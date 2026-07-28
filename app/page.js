import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Stats from "./components/Stats";
import Collections from "./components/Collections";
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
      <Collections />
      <Testimonials />
      <Newsletter />
      <Footer />
      <ContactFloat />
    </main>
  );
}
