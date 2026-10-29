import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function Home() {
  const requestHeaders = await headers();
  const accepted = requestHeaders.get("accept-language")?.toLowerCase() ?? "";
  redirect(accepted.split(",").some((language) => language.trim().startsWith("en")) ? "/en" : "/fr");
}