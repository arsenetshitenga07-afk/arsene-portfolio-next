import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{ const {locale}=await params; const t=await getTranslations({locale,namespace:"contact"}); return {title:t("metaTitle")}; }
export default async function ContactPage() {
  const t=await getTranslations("contact");
  return <section className="page-shell contact-page">
    <header className="page-intro" data-reveal><p className="eyebrow">{t("eyebrow")}</p>
      <h1>{t("titleA")}<br/><span className="accent-word">{t("titleB")}</span></h1><p className="page-lead">{t("intro")}</p></header>
    <div className="contact-layout"><div className="contact-details" data-reveal>
      <p className="contact-availability"><span className="status-dot"/>{t("availability")}</p>
      <div className="contact-detail"><p className="eyebrow">{t("emailLabel")}</p><a href="mailto:arsene.tshitenja07@gmail.com">arsene.tshitenja07@gmail.com ↗</a></div>
      <div className="contact-detail"><p className="eyebrow">{t("phoneLabel")}</p><a href="tel:+243840212146">+243 840 212 146 ↗</a></div>
      <div className="contact-detail"><p className="eyebrow">{t("locationLabel")}</p><p>{t("location")}</p></div>
    </div><div className="contact-form-wrap" data-reveal><h2>{t("formTitle")}</h2><ContactForm/></div></div>
  </section>;
}
