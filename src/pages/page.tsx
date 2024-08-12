import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h5 className='font-cactus text-[50px] w-full text-center'>Welcome in my Articles Management App!</h5>
        <Link className='text-pink w-full justify-self-end text-center font-medium  md:text-3xl p-0 m-0 whitespace-nowrap font-bebas' href={'/main'}>Explore All Articles</Link>
      </div>
    </main>
  );
}
