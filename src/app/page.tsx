import StartHero from "@/components/Heros/Start";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <StartHero />
      <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
    </>
  );
}
