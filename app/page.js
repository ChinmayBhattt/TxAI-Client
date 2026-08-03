import TopBanner from "./components/TopBanner";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import MakeItSpecial from "./components/MakeItSpecial";
import Collections from "./components/Collections";
import VideoShowcase from "./components/VideoShowcase";
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
      <MakeItSpecial />
      <Collections />
      <VideoShowcase />
      <Testimonials />
      <Newsletter />
      <Footer />
      <ContactFloat />
    </main>
  );
}
