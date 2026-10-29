import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
export function Footer() {
  const t = useTranslations("footer");
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <p className="eyebrow">{t("eyebrow")}</p>
        <a className="footer-email" href="mailto:arsene.tshitenja07@gmail.com">{t("cta")} <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer-bottom">
        <Link href="/" className="footer-mark">ARSÈNE<span>.</span></Link>
        <p>© {new Date().getFullYear()} {t("copyright")}</p>
        <a href="https://github.com/arsenetshitenga07-afk" target="_blank" rel="noreferrer">GitHub ↗</a>
        <p className="footer-location">{t("location")}</p>
      </div>
    </footer>
  );
}