import QuoteGenerator from '../components/QuoteGenerator'

export const runtime = "edge";

export default function Home()
{
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-slate-800 ">
      <header className="text-4xl font-bold mb-8 text-center text-slate-900 dark:text-white">
        Movie Quote Generator
      </header>
      <main className="max-w-md mx-auto p-4">
        <QuoteGenerator />
      </main>
      <footer className="mt-8 text-center text-gray-500">
        Powered by Next.js and OpenAI.
      </footer>
    </div>
  )
}
