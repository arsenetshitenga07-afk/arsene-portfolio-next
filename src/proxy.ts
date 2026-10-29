import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Ignore API routes, Next.js internals, and files with extensions.
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
