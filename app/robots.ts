import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Robots.
 *
 * Tudo liberado: não existe rota privada no site. Quando o painel da fase dois entrar, a
 * rota dele precisa ser bloqueada aqui, e vale lembrar que isso é para não aparecer em
 * busca, e não segurança. Quem protege o painel é a autenticação.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
