import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/footer";
import { MotionRoot } from "@/components/motion-root";
import { Nav } from "@/components/nav";
import { Portfolio } from "@/components/portfolio";
import { getDictionary, hasLocale } from "@/content";

export async function generateMetadata({ params }: PageProps<"/[lang]/work">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { title: getDictionary(lang).meta.workTitle };
}

export default async function Work({ params }: PageProps<"/[lang]/work">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);
  const { portfolio } = dict;

  return (
    <>
      <Nav lang={lang} labels={dict.nav} page="work" />
      <main>
        <h1 className="sr-only">{dict.meta.workTitle}</h1>
        <p className="mx-auto max-w-2xl px-5 pt-10 text-center text-muted">{portfolio.pageLede}</p>
        <Portfolio text={portfolio} title={portfolio.pageHeading} />
        <section className="mx-auto max-w-2xl px-5 pb-20 text-center">
          <h2 className="text-2xl font-bold">{portfolio.privateHeading}</h2>
          <p className="mt-2 text-muted">{portfolio.privateText}</p>
        </section>
        <Footer
          lang={lang}
          nav={dict.nav}
          credit={dict.footer.credit}
          socialsLabel={dict.hero.label}
          page="work"
        />
      </main>
      <MotionRoot />
    </>
  );
}
