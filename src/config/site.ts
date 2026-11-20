export const site = {
  brand: "Aura Studio",
  specialty: "Estética & Bem-Estar",
  hero: {
    title: "Sua beleza merece um cuidado especial.",
    description: "Reserve um tempo para você. Conheça nossos cuidados faciais e corporais e encontre o atendimento que combina com a sua rotina.",
    image: `${process.env.GITHUB_PAGES === "true" ? "/aura-studio" : ""}/aura-facial.jpg`,
    alt: "Mulher de olhos fechados recebendo um cuidado facial em uma maca de linho",
  },
  services: [
    { id: "limpeza-facial", title: "Limpeza de pele", description: "Uma rotina de limpeza e cuidado facial adaptada às características da sua pele." },
    { id: "hidratacao-facial", title: "Hidratação facial", description: "Um momento de cuidado com foco no conforto e na hidratação da pele." },
    { id: "massagem-relaxante", title: "Massagem relaxante", description: "Uma pausa para desacelerar, com movimentos suaves e atenção ao seu conforto." },
  ],
  about: {
    title: "Cuidado que começa pela escuta",
    description: "Na Aura Studio, a primeira conversa faz parte do atendimento. Queremos entender suas preferências e seu momento para orientar a escolha do cuidado.",
  },
  steps: [
    { title: "Converse com a equipe", description: "Conte pelo WhatsApp qual cuidado despertou seu interesse." },
    { title: "Combine seu horário", description: "Tire dúvidas sobre o atendimento e consulte os horários disponíveis." },
    { title: "Reserve seu momento", description: "Confirme a visita e receba as orientações para o dia." },
  ],
  faq: [
    { question: "Preciso saber qual serviço escolher?", answer: "Você pode começar contando o que procura. A equipe explica as opções e ajuda a decidir o próximo passo." },
    { question: "Como consulto valores e horários?", answer: "Envie uma mensagem pelo WhatsApp. A equipe informa os valores e a disponibilidade para o atendimento escolhido." },
    { question: "Preciso me preparar para a primeira visita?", answer: "Ao confirmar o horário, pergunte à equipe se há orientações específicas para o seu atendimento." },
  ],
  contact: {
    title: "Vamos agendar sua avaliação?",
    description: "Converse com a equipe pelo WhatsApp para tirar dúvidas e consultar horários.",
    cta: "Agendar pelo WhatsApp",
    greeting: "Olá! Cheguei pelo site da Aura Studio.",
  },
  seo: {
    title: "Aura Studio | Estética & Bem-Estar",
    description: "Conheça os cuidados faciais e corporais da Aura Studio e consulte horários de atendimento pelo WhatsApp.",
  },
};

const rawPhone = process.env.WHATSAPP_NUMBER?.trim() ?? "";
const rawUrl = process.env.SITE_URL?.trim();
const parsedUrl = rawUrl ? new URL(rawUrl) : undefined;
export const siteUrl = parsedUrl && ["https:", "http:"].includes(parsedUrl.protocol)
  ? new URL(parsedUrl.origin)
  : undefined;

export const whatsappNumber = /^[1-9][0-9]{7,14}$/.test(rawPhone) ? rawPhone : "";
export const indexable = Boolean(siteUrl && whatsappNumber && process.env.SITE_INDEXABLE === "true");


