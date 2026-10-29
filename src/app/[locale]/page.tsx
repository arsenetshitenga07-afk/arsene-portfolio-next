import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { ProjectCard } from "@/components/project-card";
import { HeroField } from "@/components/hero-field";
import { InteractiveMonogram } from "@/components/interactive-monogram";
import type { Project } from "@/types/project";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{ const {locale}=await params; const t=await getTranslations({locale,namespace:"metadata"}); return {title:t("title"),description:t("description")}; }

export default async function HomePage() {
  const t=await getTranslations("home");
  const workT=await getTranslations("works");
  const projects=(await getTranslations("projects")).raw("items") as Project[];
  const services=t.raw("services") as string[];
  const personSchema={"@context":"https://schema.org","@type":"Person",name:"Arsène Tshitenga Ntambwa",
    jobTitle:"Full-stack developer",address:{"@type":"PostalAddress",addressLocality:"Kinshasa",addressCountry:"CD"},
    sameAs:["https://github.com/arsenetshitenga07-afk"]};
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(personSchema)}}/>
    <section className="hero-section">
      <div className="hero-field" aria-hidden="true"><HeroField/><div className="hero-glow"/><div className="hero-orbit"/></div>
      <div className="hero-content">
        <div className="hero-status"><span className="status-dot"/>{t("availability")}</div>
        <p className="eyebrow hero-kicker">{t("kicker")} <span>— {t("location")}</span></p>
        <h1 className="hero-title"><span>{t("titleA")}</span><span>{t("titleB")}</span><span className="accent-word">{t("titleC")}</span></h1>
        <p className="hero-intro">{t("intro")}</p>
        <div className="hero-actions"><Link className="button button-primary" href="/works">{t("primaryCta")} <span>↘</span></Link>
          <Link className="text-link" href="/contact">{t("secondaryCta")} <span>↗</span></Link></div>
      </div>
      <p className="hero-scroll">{t("scroll")} <span>↓</span></p>
      <div className="hero-stamp" aria-hidden="true">{t("stampText")}</div>
    </section>
    <section className="section-wrap featured-section">
      <div className="section-heading" data-reveal><div><p className="eyebrow">{t("featuredLabel")}</p>
        <h2>{t("workTitle")}<br/><span className="accent-word">{t("workTitleAccent")}</span></h2></div><p>{t("workIntro")}</p></div>
      <div className="project-grid featured-grid">{projects.slice(0,3).map((p,i)=><ProjectCard key={p.slug} project={p} index={i} label={workT("openProject")}/>)}</div>
      <div className="section-more"><Link className="text-link" href="/works">{t("allWorks")} <span>↗</span></Link></div>
    </section>
    <section className="manifesto-section">
      <div className="manifesto-orbit" aria-hidden="true"><InteractiveMonogram /></div>
      <div className="manifesto-copy" data-reveal><p className="eyebrow">{t("noteLabel")}</p><h2>{t("noteTitle")}</h2>
        <p>{t("noteBody")}</p><Link className="text-link" href="/about">{t("aboutLink")} <span>↗</span></Link></div>
      <div className="manifesto-services"><p className="eyebrow">{t("servicesLabel")}</p>{services.map((s,i)=><p key={s}><span>0{i+1}</span>{s}</p>)}</div>
    </section>
  </>;
}
