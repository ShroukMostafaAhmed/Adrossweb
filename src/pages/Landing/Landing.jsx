import Header from "../../components/landing/Header";
import Hero from "../../components/landing/Hero";
import WhyUs from "../../components/landing/WhyUs";
import EducationStages from "../../components/landing/EducationStages";
import SubscriptionPlans from "../../components/landing/SubscriptionPlans/SubscriptionPlans";
import Footer from "../../components/landing/Footer";

function Landing() {
  return (
    <>
      <Header />
      <main>
        <section id="hero" aria-label="الرئيسية">
          <Hero />
        </section>
        <section id="whyUs" aria-label="لماذا نحن">
          <WhyUs />
        </section>
        <section id="education" aria-label="المراحل التعليمية">
          <EducationStages />
        </section>
        <section id="subs" aria-label="باقات الاشتراك">
          <SubscriptionPlans />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Landing;