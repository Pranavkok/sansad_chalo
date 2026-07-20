import { Hero } from "@/components/home/hero";
import { Ticker } from "@/components/home/ticker";
import { LiveCounter } from "@/components/home/live-counter";
import { Demands } from "@/components/home/demands";
import { CardTease } from "@/components/home/card-tease";
import { getSupporterCount } from "@/actions/supporter";

export default async function Home() {
  const initialCount = await getSupporterCount();

  return (
    <div className="container mx-auto px-4">
      <Hero />
      <Ticker />
      <LiveCounter initialCount={initialCount} />
      <Demands />
      <CardTease />
    </div>
  );
}
