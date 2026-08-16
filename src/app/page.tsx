import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Journey } from "@/sections/Journey";
import { Work } from "@/sections/Work";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { Clients } from "@/sections/Clients";
import { FAQ } from "@/sections/FAQ";
import { ContactCTA } from "@/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Journey />
      <Services />
      <Process />
      <Clients />
      <FAQ />
      <ContactCTA />
    </>
  );
}
