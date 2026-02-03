const content = `# Spoltec Södra AB

> Spoltec är ett svenskt företag grundat 1991 som specialiserar sig på miljövänlig relining, avloppsspolning, kvicksilversanering, rörinspektion och underhåll av avloppssystem för privatpersoner och företag i hela Sverige.

## Om företaget

- Organisationsnummer: 556712-5363
- Grundat: 1991
- Huvudkontor: Grävmaskinsvägen 2, 241 38 Eslöv, Skåne
- Telefon: 040-47 40 12
- E-post: info@spoltec.se
- Akutjour: Tillgänglig dygnet runt, alla dagar

## Tjänster

- [Relining](https://www.spoltec.se/tjanster/relining): Förnya avloppsrör utan rivning med strumpmetoden. Livslängd 40-50 år, miljövänligt utan bisfenol och epoxy.
- [Avloppsspolning](https://www.spoltec.se/tjanster/avloppsspolning): Högtrycksspolning för akuta stopp eller förebyggande underhåll av avloppssystem.
- [Rörinspektion med filmning](https://www.spoltec.se/tjanster/rorinspektion): Kamerainspektion för att upptäcka skador, sprickor och rotinträngning i rör.
- [Kvicksilversanering](https://www.spoltec.se/tjanster/kvicksilversanering): Professionell sanering av kvicksilverföroreningar i fastigheter och mark.
- [Oljeavskiljare](https://www.spoltec.se/tjanster/oljeavskiljare): Rengöring, tömning och underhåll av oljeavskiljare enligt lagkrav.
- [Provtagning av vatten](https://www.spoltec.se/tjanster/provtagning-av-vatten): Vattenprovtagning för att säkerställa att vattenkvaliteten uppfyller lagstadgade krav.
- [Kanaltätning](https://www.spoltec.se/tjanster/kanaltatning): Energibesparing genom tätning av ventilationskanaler med Spoltecs patenterade metod.

## Serviceområden

Spoltec erbjuder tjänster i hela Sverige med fokus på:
- Skåne (Malmö, Eslöv, Lund, Helsingborg)
- Stockholm
- Göteborg
- Uppsala
- Jönköping

## Sidor

- [Startsida](https://www.spoltec.se/): Översikt av Spoltecs tjänster och expertis inom avloppssystem.
- [Alla tjänster](https://www.spoltec.se/tjanster): Komplett lista över alla tjänster Spoltec erbjuder.
- [Om Spoltec](https://www.spoltec.se/om-spoltec): Information om företagets historia, värderingar och team.
- [Kunskapsbank](https://www.spoltec.se/kunskapsbank): Artiklar och guider om avlopp, relining och rörvård.
- [Vanliga frågor](https://www.spoltec.se/faq): Svar på vanliga frågor om Spoltecs tjänster.
- [Kontakta oss](https://www.spoltec.se/kontakta-oss): Kontaktformulär och kontaktuppgifter.
- [Akut hjälp](https://www.spoltec.se/akut-hjalp): Information om akuta avloppsproblem och jourtjänst.

## Optional

- [LinkedIn](https://www.linkedin.com/company/spoltec-södra-ab/): Företagets LinkedIn-profil
- [Facebook](https://www.facebook.com/spoltec): Företagets Facebook-sida
`;

export async function GET(): Promise<Response> {
  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
