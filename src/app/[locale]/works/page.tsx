import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ProjectFilter } from "@/components/project-filter";
import type { Project } from "@/types/project";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{ const {locale}=await params; const t=await getTranslations({locale,namespace:"works"}); return {title:t("metaTitle")}; }
export default async function WorksPage() {
  const t=await getTranslations("works");
  const projects=(await getTranslations("projects")).raw("items") as Project[];
  return <section className="page-shell works-page">
    <header className="page-intro" data-reveal><p className="eyebrow">{t("eyebrow")}</p>
      <h1>{t("title")}</h1><p className="page-lead">{t("subtitle")}</p></header>
    <ProjectFilter projects={projects} labels={{all:t("all"),interface:t("interface"),application:t("application"),experiment:t("experiment")}} filterLabel={t("filterLabel")} emptyLabel={t("empty")} openLabel={t("openProject")}/>
  </section>;
}
