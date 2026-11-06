import Link from "next/link";
import { notFound } from "next/navigation";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { MotionRoot } from "@/components/motion-root";
import { Nav } from "@/components/nav";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { getDictionary, hasLocale } from "@/content";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <>
      <Nav lang={lang} labels={dict.nav} page="home" />
      <main>
        <Hero lang={lang} text={dict.hero} />
        <Services text={dict.services} />
        <About text={dict.about} />
        <Experience text={dict.experience} />
        <Portfolio text={dict.portfolio} />
        <p className="-mt-12 text-center">
          <Link href={`/${lang}/work`} className="text-accent underline underline-offset-4">
            {dict.portfolio.seeAll}
          </Link>
        </p>
        <Contact text={dict.contact} services={dict.services.items.map((item) => item.title)} />
        <Footer
          lang={lang}
          nav={dict.nav}
          credit={dict.footer.credit}
          socialsLabel={dict.hero.label}
          page="home"
        />
      </main>
      <MotionRoot />
    </>
  );
}
