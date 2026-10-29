import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
export default async function NotFoundPage() {
  const t=await getTranslations("notFound");
  return <section className="page-shell not-found"><p className="eyebrow">{t("eyebrow")}</p><h1>{t("title")}</h1>
    <p className="page-lead">{t("body")}</p><Link className="button button-primary" href="/">{t("home")} ↗</Link></section>;
}