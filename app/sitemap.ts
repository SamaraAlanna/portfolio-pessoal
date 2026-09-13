import type { MetadataRoute } from "next";
import { lerProjetos } from "@/lib/conteudo";
import { SITE } from "@/lib/site";

/**
 * Sitemap.
 *
 * As rotas fixas estão listadas à mão porque são cinco e não mudam. Os cases vêm da
 * mesma leitura que monta a listagem, então case novo entra no sitemap sozinho.
 *
 * O `lastModified` é a data do build. Sem banco e sem campo de data no frontmatter, é o
 * que existe de verdade, e mentir uma data por projeto seria pior que não ter.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();

  const fixas = [
    { caminho: "", prioridade: 1 },
    { caminho: "/projetos", prioridade: 0.9 },
    { caminho: "/sobre", prioridade: 0.8 },
    { caminho: "/stack", prioridade: 0.6 },
    { caminho: "/contato", prioridade: 0.6 },
  ].map(({ caminho, prioridade }) => ({
    url: `${SITE}${caminho}`,
    lastModified: agora,
    changeFrequency: "monthly" as const,
    priority: prioridade,
  }));

  const cases = lerProjetos().map((projeto) => ({
    url: `${SITE}/projetos/${projeto.slug}`,
    lastModified: agora,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...fixas, ...cases];
}
