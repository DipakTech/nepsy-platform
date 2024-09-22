// "use client";
// import { addShareEntry } from "@/action/share/addShareEntry";
import { Footer } from "@/components/component/footer";
import Header from "@/components/component/header";
import HeroSection from "@/components/component/hero-section";
import DeploymentHero from "@/components/component/IpoResultCheckHero";
import GradientBackground from "@/components/ui/gradient-background";
// import { Button } from "@/components/ui/button";
// import GridPattern from "@/components/magicui/animated-grid-pattern";

export const metadata = {
  title: "Check Bulk IPO results in seconds,not hours",
  openGraph: {
    title:
      "We take your and your family's bulk information and check at once in a single click.",
  },
};

const Home = async () => {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* <Button onClick={() => addShareEntry()}>Add</Button> */}
      <div className="w-screen h-auto overflow-hidden ">
        {/* <GridPattern numSquares={5} maxOpacity={0.1} /> */}
      </div>
      <Header />
      <main className="min-h-[calc(100vh-40px)] overflow-hidden flex-1">
        <DeploymentHero />
        <GradientBackground />
        <HeroSection />
        <Footer />
      </main>
    </main>
  );
};

export default Home;
