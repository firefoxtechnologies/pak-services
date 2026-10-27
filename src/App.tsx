import { useState } from "react";
import { useApp } from "./context";
import Sprite from "./components/Sprite";
import { Announcement, Navbar, Progress } from "./components/Top";
import Hero from "./components/Hero";
import QuickQuote from "./components/QuickQuote";
import PromiseStrip from "./components/PromiseStrip";
import Slider from "./components/Slider";
import Services from "./components/Services";
import { FAQ, HowItWorks, Membership, WhyUs } from "./components/Info";
import TaxTool from "./components/TaxTool";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import Cities from "./components/Cities";
import Contact from "./components/Contact";
import { Fabs, Footer } from "./components/Footer";
import { DetailsDialog } from "./components/Dialogs";

export default function App() {
  const { t } = useApp();
  const [details, setDetails] = useState<number | null>(null);
  return (
    <>
      <a className="skip" href="#services">{t("skip")}</a>
      <Progress />
      <Announcement />
      <Navbar />
      <main id="top">
        <Hero />
        <QuickQuote />
        <PromiseStrip />
        <Services onDetails={setDetails} />
        <HowItWorks />
        <WhyUs />
        <Slider onDetails={setDetails} />
        <Portfolio />
        <Testimonials />
        <Membership />
        <TaxTool />
        <FAQ />
        <Cities />
        <Contact />
      </main>
      <Footer />
      <DetailsDialog index={details} onClose={() => setDetails(null)} />
      <Fabs />
      <Sprite />
    </>
  );
}
