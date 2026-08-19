import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { Icon } from "@/components/ui/icon";
import { ARTICLES, INSIGHTS_CONFIRMED, type ArticleBlock } from "@/content/insights";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getArticle(slug: string) {
  if (!INSIGHTS_CONFIRMED) return undefined;
  return ARTICLES.find((article) => article.slug === slug);
}

export async function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.summary,
  };
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-8 text-xl font-bold tracking-tight text-primary">{block.text}</h2>
      );
    case "list":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-sm text-slate">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="mt-6 border-l-2 border-primary/40 pl-5 text-base italic text-ink">
          {block.text}
          {block.attribution && (
            <footer className="mt-2 font-mono text-xs not-italic uppercase tracking-[0.09em] text-slate">
              — {block.attribution}
            </footer>
          )}
        </blockquote>
      );
    case "paragraph":
    default:
      return <p className="mt-4 text-sm leading-relaxed text-slate">{block.text}</p>;
  }
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-7 md:py-24">
      <Link
        href="/insights"
        className="group inline-flex items-center gap-2 text-sm font-medium text-slate transition-colors duration-200 hover:text-ink"
      >
        <Icon
          icon={ArrowLeft01Icon}
          size={16}
          className="shrink-0 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
        />
        Back to insights
      </Link>
      <p className="mt-8 font-mono text-xs uppercase tracking-[0.09em] text-slate">
        {article.category}
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">
        {article.title}
      </h1>
      <p className="mt-4 border-b border-rule pb-6 text-xs text-slate">
        {article.publishedAt} · {article.readTime}
      </p>
      <div className="mt-2">
        {article.body.map((block, i) => (
          <Block key={i} block={block} />
        ))}
      </div>
    </div>
  );
}
