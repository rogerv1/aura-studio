import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/config/site";
import { WhatsAppLink } from "./whatsapp";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[78rem] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

export function Hero() {
  return (
    <section aria-labelledby="hero-titulo" className="pb-16 pt-8 sm:pt-12 lg:pb-24">
      <Container className="grid items-center gap-10 lg:grid-cols-[0.95fr_1fr] lg:gap-16">
        <div>
          <p className="eyebrow mb-5">{site.specialty}</p>
          <h1 id="hero-titulo" className="max-w-[10ch] font-display text-forest text-[clamp(3.4rem,7.2vw,7rem)] leading-[0.88] tracking-[-0.055em]">{site.hero.title}</h1>
          <p className="mb-8 mt-6 max-w-md leading-relaxed">{site.hero.description}</p>
          <WhatsAppLink source="início" label={site.contact.cta} />
        </div>
        <div className="relative aspect-[5/4] overflow-hidden rounded-t-[6rem] rounded-b-3xl bg-sand sm:rounded-t-[9rem] lg:aspect-[1.06]">
          <Image src={site.hero.image} alt={site.hero.alt} fill preload sizes="(min-width: 1280px) 550px, (min-width: 1024px) 48vw, 94vw" className="object-cover object-center" />
        </div>
      </Container>
    </section>
  );
}

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-titulo" className="bg-sand/35 py-16 sm:py-24">
      <Container>
        <p className="eyebrow mb-3">Serviços</p>
        <h2 id="servicos-titulo" className="section-title">Escolha seu momento de cuidado</h2>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {site.services.map((service) => (
            <article key={service.id} className="flex flex-col items-start rounded-3xl border border-sand bg-ivory p-6 sm:p-8">
              <h3 className="font-display text-4xl leading-none text-forest">{service.title}</h3>
              <p className="mb-7 mt-4 flex-1 leading-relaxed">{service.description}</p>
              <WhatsAppLink source={`serviço: ${service.id}`} service={service.title} label="Consultar pelo WhatsApp" variant="outline" />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function About() {
  return (
    <section id="sobre" aria-labelledby="sobre-titulo" className="py-16 sm:py-24">
      <Container className="grid gap-6 md:grid-cols-2 md:items-end">
        <div><p className="eyebrow mb-3">Sobre o estúdio</p><h2 id="sobre-titulo" className="section-title">{site.about.title}</h2></div>
        <p className="max-w-lg leading-relaxed">{site.about.description}</p>
      </Container>
    </section>
  );
}

export function Steps() {
  return (
    <section aria-labelledby="etapas-titulo" className="bg-forest py-16 text-ivory sm:py-24">
      <Container>
        <h2 id="etapas-titulo" className="font-display text-5xl leading-none sm:text-6xl">Como agendar</h2>
        <ol className="mt-8 grid list-decimal gap-6 pl-6 marker:font-semibold marker:text-sand md:grid-cols-3">
          {site.steps.map((step) => <li key={step.title} className="border-t border-sage pt-4"><h3 className="font-semibold">{step.title}</h3><p className="mt-2 leading-relaxed">{step.description}</p></li>)}
        </ol>
      </Container>
    </section>
  );
}

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-titulo" className="py-16 sm:py-24">
      <Container className="grid gap-8 md:grid-cols-[0.75fr_1fr]">
        <h2 id="duvidas-titulo" className="section-title">Dúvidas frequentes</h2>
        <div className="divide-y divide-sand border-y border-sand">
          {site.faq.map(({ question, answer }) => (
            <details key={question} className="px-1">
              <summary className="cursor-pointer py-4 font-semibold text-forest">{question}</summary>
              <p className="pb-5 leading-relaxed">{answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contato" aria-labelledby="contato-titulo" className="pb-16 sm:pb-24">
      <Container>
        <div className="rounded-3xl bg-forest px-6 py-12 text-center text-ivory sm:px-12 sm:py-16">
          <h2 id="contato-titulo" className="font-display text-5xl leading-none sm:text-6xl">{site.contact.title}</h2>
          <p className="mx-auto mb-7 mt-4 max-w-lg leading-relaxed">{site.contact.description}</p>
          <div className="flex flex-col items-center"><WhatsAppLink source="contato" label={site.contact.cta} variant="light" /></div>
        </div>
      </Container>
    </section>
  );
}

