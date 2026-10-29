import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LabPlayground } from "@/components/lab-playground";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{ const {locale}=await params; const t=await getTranslations({locale,namespace:"lab"}); return {title:t("metaTitle")}; }
export default async function LabPage() {
  const t=await getTranslations("lab");
  return <section className="page-shell lab-page">
    <header className="page-intro" data-reveal><p className="eyebrow">{t("eyebrow")}</p>
      <h1>{t("titleA")}<br/><span className="accent-word">{t("titleB")}</span></h1><p className="page-lead">{t("intro")}</p></header>
    <LabPlayground/><p className="lab-note">{t("note")}</p>
  </section>;
}
