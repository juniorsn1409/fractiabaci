import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="bg-slate-300/[0.5] w-screen h-screen">
      Área Limite Designada
      <section className="bg-black/[0.5] flex items-stretch">
        <div className="bg-yellow-200 basis-1/3 h-80 m-1">
          Área da Centena
        </div>
        <div className="bg-blue-200 basis-1/3 h-80 m-1">
          Área da Dezena
        </div>
        <div className="bg-red-200 basis-1/3 h-80 m-1">
          Área da Unidade
        </div>
      </section>
    </main>
  )
}
