// "use client";
// import { addShareEntry } from "@/action/share/addShareEntry";
import Header from "@/components/component/header";
import DeploymentHero from "@/components/component/IpoResultCheckHero";
// import { Button } from "@/components/ui/button";
// import GridPattern from "@/components/magicui/animated-grid-pattern";

const Home = async () => {
  return (
    <main className="flex min-h-screen flex-col overflow-hidden">
      {/* <Button onClick={() => addShareEntry()}>Add</Button> */}
      <div className="w-screen h-auto overflow-hidden ">
        {/* <GridPattern numSquares={5} maxOpacity={0.1} /> */}
      </div>
      <Header />
      <main className="min-h-[calc(100vh-150px)] flex-1">
        <DeploymentHero />;
      </main>
      {/* <Footer /> */}
    </main>
  );
};

export default Home;
