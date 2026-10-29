import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleDocument } from "@/components/locale-document";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
export async function generateMetadata({params}:{params:Promise<{locale:string}>}):Promise<Metadata>{
  const {locale}=await params; const t=await getTranslations({locale,namespace:"metadata"});
  return {title:t("title"),description:t("description"),alternates:{canonical:"/"+locale,languages:{fr:"/fr",en:"/en"}},
    openGraph:{title:t("title"),description:t("description"),locale:locale==="fr"?"fr_FR":"en_US",type:"website"}};
}
export default async function LocaleLayout({children,params}:Readonly<{children:React.ReactNode;params:Promise<{locale:string}>}>){
  const {locale}=await params; if(!hasLocale(routing.locales,locale)) notFound();
  const messages=await getMessages({locale});
  return <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <NextIntlClientProvider messages={messages}><LocaleDocument/><ScrollReveal/><Navbar/>
      <main id="main-content" className="site-main">{children}</main><Footer/>
    </NextIntlClientProvider></ThemeProvider>;
}