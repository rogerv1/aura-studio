import { site, whatsappNumber } from "@/config/site";

type Source = "início" | "contato" | `serviço: ${string}`;

function messageFor(source: Source, service?: string) {
  const request = service
    ? `Gostaria de saber mais sobre ${service} e consultar os horários.`
    : "Gostaria de agendar uma avaliação.";
  return `${site.contact.greeting} ${request} (Origem: ${source})`;
}

export function WhatsAppLink({ source, label, service, variant = "solid" }: {
  source: Source;
  label: string;
  service?: string;
  variant?: "solid" | "outline" | "light";
}) {
  const message = messageFor(source, service);
  const href = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    : `#demo-${encodeURIComponent(source)}`;
  const scheme = {
    solid: "bg-forest text-ivory hover:bg-ink",
    outline: "border border-forest text-forest hover:bg-sand",
    light: "bg-ivory text-forest hover:bg-sand",
  };

  return (
    <>
      <a className={`inline-flex min-h-12 w-fit items-center justify-center rounded-full px-5 py-3 text-sm font-semibold ${scheme[variant]}`}
        href={href} aria-label={service ? `${label} sobre ${service}` : undefined}>{label}</a>
      {!whatsappNumber && (
        <div id={`demo-${source}`} tabIndex={-1} className="demo-panel mt-3 max-w-sm rounded-xl border border-sand bg-ivory p-4 text-left text-sm text-ink">
          <p className="font-semibold">Prévia da mensagem de WhatsApp</p>
          <p className="my-2 leading-relaxed">{message}</p>
          <p>O envio fica disponível quando o estúdio configurar o número.</p>
        </div>
      )}
    </>
  );
}

