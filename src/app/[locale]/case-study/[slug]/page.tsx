import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import type { Project } from "@/types/project";
async function findProject(locale:string,slug:string) {
  const t=await getTranslations({locale,namespace:"projects"});
  return (t.raw("items") as Project[]).find((p)=>p.slug===slug);
}
export async function generateMetadata({params}:{params:Promise<{locale:string;slug:string}>}):Promise<Metadata> {
  const {locale,slug}=await params; const project=await findProject(locale,slug);
  return project ? {title:project.title+" — Arsène Tshitenga",description:project.summary,
    openGraph:{title:project.title,description:project.summary,type:"article"}} : {};
}
export async function generateStaticParams() {
  const t=await getTranslations({locale:"fr",namespace:"projects"});
  return (t.raw("items") as Project[]).map(({slug})=>({slug}));
}
export default async function CaseStudyPage({params}:{params:Promise<{locale:string;slug:string}>}) {
  const {locale,slug}=await params; const project=await findProject(locale,slug); if(!project) notFound();
  const t=await getTranslations({locale,namespace:"caseStudy"});
  const projects=(await getTranslations({locale,namespace:"projects"})).raw("items") as Project[];
  const index=projects.findIndex((p)=>p.slug===slug); const next=projects[(index+1)%projects.length];
  const creativeWork={"@context":"https://schema.org","@type":"CreativeWork","name":project.title,"description":project.summary,"creator":{"@type":"Person","name":"Arsène Tshitenga Ntambwa"},"dateCreated":project.year,"keywords":project.stack};
  return <article className="page-shell case-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(creativeWork)}}/>
    <Link className="back-link" href="/works">← {t("back")}</Link>
    <header className="case-hero" data-reveal><p className="eyebrow">{project.category} · {project.year}</p>
      <h1>{project.title}</h1><p className="page-lead">{project.summary}</p>
      <div className={"case-art project-art art-"+project.visual} aria-hidden="true"><span className="art-orbit art-orbit-one"/><span className="art-orbit art-orbit-two"/><span className="art-core">✳</span><span className="art-caption">{project.category}</span></div>
    </header>
    <section className="case-brief" data-reveal><div><p className="eyebrow">{t("role")}</p><p>{project.role}</p></div><div><p className="eyebrow">{t("context")}</p><p>{project.context}</p></div></section>
    <section className="case-story">
      <div data-reveal><p className="eyebrow">{t("challenge")}</p><h2>{project.challenge}</h2></div>
      <div data-reveal><p className="eyebrow">{t("approach")}</p><p className="case-copy">{project.approach}</p></div>
      <div data-reveal><p className="eyebrow">{t("outcome")}</p><p className="case-copy">{project.outcome}</p></div>
    </section>
    <section className="case-stack" data-reveal><p className="eyebrow">{t("stack")}</p><ul>{project.stack.map((x)=><li key={x}>{x}</li>)}</ul></section>
    <section className="next-project"><div><p className="eyebrow">{t("next")}</p><h2>{next.title}</h2></div><Link className="button button-primary" href={"/case-study/"+next.slug}>{t("nextLink")} ↗</Link></section>
  </article>;
}
