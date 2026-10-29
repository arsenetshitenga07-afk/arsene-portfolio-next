import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
type TimelineItem={role?:string;degree?:string;place:string;date:string;detail?:string};
type SkillGroup={title:string;items:string[]};
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{ const {locale}=await params; const t=await getTranslations({locale,namespace:"about"}); return {title:t("metaTitle")}; }
export default async function AboutPage() {
  const t=await getTranslations("about");
  const experience=t.raw("experienceItems") as TimelineItem[];
  const education=t.raw("educationItems") as TimelineItem[];
  const skills=t.raw("skillGroups") as SkillGroup[];
  return <section className="page-shell about-page">
    <header className="page-intro about-intro" data-reveal><p className="eyebrow"><span className="eyebrow-number">03 /</span> {t("eyebrow")}</p>
      <h1>{t("titleA")}<br/><span className="accent-word">{t("titleB")}</span></h1><p className="page-lead">{t("lead")}</p></header>
    <section className="about-story" data-reveal><p className="eyebrow">{t("storyLabel")}</p><h2>{t("storyTitle")}</h2><p>{t("story")}</p></section>
    <section className="timeline-section">
      <div className="timeline-column" data-reveal><h2 className="section-label">{t("experience")}</h2>
        {experience.map((x,i)=><article className="timeline-item" key={x.date}><span className="timeline-index">0{i+1}</span>
          <div><p className="timeline-date">{x.date}</p><h3>{x.role}</h3><p className="timeline-place">{x.place}</p><p className="timeline-detail">{x.detail}</p></div></article>)}</div>
      <div className="timeline-column" data-reveal><h2 className="section-label">{t("education")}</h2>
        {education.map((x,i)=><article className="timeline-item" key={x.date}><span className="timeline-index">0{i+1}</span>
          <div><p className="timeline-date">{x.date}</p><h3>{x.degree}</h3><p className="timeline-place">{x.place}</p></div></article>)}</div>
    </section>
    <section className="skills-section" data-reveal><p className="eyebrow">{t("skills")}</p><div className="skills-grid">
      {skills.map((g)=><div className="skill-group" key={g.title}><h3>{g.title}</h3><ul>{g.items.map((x)=><li key={x}>{x}</li>)}</ul></div>)}</div></section>
    <section className="about-cta"><h2>{t("contactCta")}</h2><Link className="button button-primary" href="/contact">{t("eyebrow")} ↗</Link></section>
  </section>;
}
