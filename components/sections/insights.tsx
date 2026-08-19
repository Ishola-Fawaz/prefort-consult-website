import Link from "next/link";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { SectionHeading } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PendingNote } from "@/components/ui/pending-note";
import { Reveal } from "@/components/ui/reveal";
import { ARTICLES, INSIGHTS_CONFIRMED } from "@/content/insights";

export function Insights() {
  return (
    <section className="border-b border-rule">
      <div className="mx-auto max-w-295 px-5 py-16 md:px-7 md:py-20">
        <Reveal>
          <SectionHeading eyebrow="Insights" title="Writing on cybersecurity, risk and compliance" />
        </Reveal>
        {INSIGHTS_CONFIRMED && ARTICLES.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ARTICLES.slice(0, 3).map((article, i) => (
              <Reveal key={article.slug} delay={i * 90}>
                <Link href={`/insights/${article.slug}`}>
                  <Card className="flex h-full flex-col">
                    <Tag severity="signal">{article.category}</Tag>
                    <h3 className="mt-4 text-lg font-bold tracking-tight text-primary">
                      {article.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm text-slate">{article.summary}</p>
                    <p className="mt-4 border-t border-rule pt-4 text-xs text-slate">
                      {article.publishedAt} · {article.readTime}
                    </p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={100} className="mt-10">
            <PendingNote>
              The first articles are in progress covering risk assessment, security
              fundamentals and what regulation means in practice for Nigerian organisations.
              Check back shortly.
            </PendingNote>
          </Reveal>
        )}
        <Reveal delay={160} className="mt-6">
          <Button as="link" href="/insights" variant="ghost" icon={ArrowRight01Icon}>
            Visit insights
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
