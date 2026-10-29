"use client";
import type { FormEvent } from "react";
import { useTranslations } from "next-intl";
export function ContactForm() {
  const t = useTranslations("contact");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(t("mailSubject", { name }));
    const body = encodeURIComponent(message + "\n\n" + t("sender") + ": " + name + "\n" + t("emailLabel") + ": " + email);
    window.location.href = "mailto:arsene.tshitenja07@gmail.com?subject=" + subject + "&body=" + body;
  }
  return <form className="contact-form" onSubmit={submit}>
    <label>{t("name")}<input autoComplete="name" name="name" required /></label>
    <label>{t("email")}<input autoComplete="email" type="email" name="email" required /></label>
    <label>{t("message")}<textarea name="message" rows={5} required /></label>
    <button className="button button-primary" type="submit">{t("send")} <span aria-hidden="true">↗</span></button>
    <p className="form-note">{t("mailtoNote")}</p>
  </form>;
}