import  {ArticleList} from "../components/articlesList";

export default function Main() {
  return (
    <main className="flex w-full min-h-screen flex-col items-center justify-between md:p-10">
      <div className='flex flex-row justify-start w-full'>
        <h1 className='font-cactus text-[50px] pb-10 w-full text-center'>Explore All</h1>       
      </div>
      <ArticleList/>     
    </main>
  );
}