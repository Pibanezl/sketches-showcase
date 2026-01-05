import Image from "next/image";
import Link from "next/link";
import { prefix } from "./layout"; // para cargar imagenes xd



export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div>
          <div className="flex flex-row items-center gap-2">
            <Image
              src={`${prefix}/motion_white.png`}
              alt="Next.js logo"
              width={40}
              height={40}
              priority
            />
            <a className="text-xl font-semibold">P5.Js Sketches Showcase</a>
          </div>
          <div className="mt-6">
            <Link href="/sketch_1">
            <button className="rounded-md border-3 border-white  text-sm font-semibold transition-colors bg-primary hover:bg-white hover:text-black hover:border-[#1eff00] h-10 px-5">
              Sketch 1
            </button>
          </Link>
          </div>
        </div>
        <Image
          className="dark:invert"
          src={`${prefix}/next.svg`}
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      </main>
    </div>
  );
}
