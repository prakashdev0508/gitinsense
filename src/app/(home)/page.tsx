import AICapabilitiesSection from "@/components/Home/AICapabilitiesSection";
import CallToAction from "@/components/Home/CallToAction";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HeroSection from "@/components/Home/HeroSection";
import Pricing from "@/components/Home/Pricing";
import StepsSection from "@/components/Home/StepsSection";
import React from "react";

const page = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <StepsSection />
      <AICapabilitiesSection />
      <Pricing />
      {/* <TeamCollaboration /> */}
      <CallToAction   />
    </div>
  );
};

export default page;
