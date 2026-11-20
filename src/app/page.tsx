import { About, Contact, Container, Faq, Hero, Services, Steps } from "@/components/sections";
import { site, whatsappNumber } from "@/config/site";

export default function Home() {
  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:absolute focus:z-10 focus:bg-ivory focus:p-4">Pular para o conteúdo</a>
      <header className="border-b border-sand sticky top-0 z-10 bg-ivory">
        <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-2 py-3">
          <a href="#conteudo" className="inline-flex min-h-11 items-center font-display text-4xl leading-none text-forest">{site.brand}</a>
          <nav aria-label="Navegação principal" className="flex flex-wrap gap-x-5 text-sm font-medium sm:gap-x-7">
            <a className="inline-flex min-h-11 items-center hover:underline" href="#servicos">Serviços</a>
            <a className="inline-flex min-h-11 items-center hover:underline" href="#sobre">Sobre</a>
            <a className="inline-flex min-h-11 items-center hover:underline" href="#duvidas">Dúvidas</a>
            <a className="inline-flex min-h-11 items-center font-semibold hover:underline" href="#contato">Agendar</a>
          </nav>
        </Container>
      </header>
      <main id="conteudo" tabIndex={-1}>
        <Hero /><Services /><About /><Steps /><Faq /><Contact />
      </main>
      <footer className="border-t border-sand py-6">
        <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
          <p className="font-display text-3xl text-forest">{site.brand}</p>
          <p className="text-sm">{whatsappNumber ? site.specialty : "Demonstração de landing page · Marca fictícia"}</p>
        </Container>
      </footer>
    </>
  );
}

