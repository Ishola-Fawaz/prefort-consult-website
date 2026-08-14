import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/section-heading";
import { PendingNote } from "@/components/ui/pending-note";
import { Card } from "@/components/ui/card";
import { ARTICLES, INSIGHTS_CONFIRMED } from "@/content/insights";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical writing on NDPA, the CBN risk-based cybersecurity framework and what enforcement means for Nigerian organisations.",
};

export default function InsightsPage() {
  return (
    <div className="mx-auto max-w-295 px-5 py-16 md:px-7 md:py-24">
      <SectionHeading
        eyebrow="Insights"
        title="Writing on Nigerian compliance and risk"
        lede="Practical notes on regulation, enforcement and what it actually means for your organisation."
      />
      {INSIGHTS_CONFIRMED && ARTICLES.length > 0 ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {ARTICLES.map((article) => (
            <Card key={article.slug} className="flex flex-col">
              <p className="font-mono text-xs uppercase tracking-[0.09em] text-slate">
                {article.category}
              </p>
              <h2 className="mt-3 text-xl font-bold tracking-tight text-primary">
                {article.title}
              </h2>
              <p className="mt-3 flex-1 text-sm text-slate">{article.summary}</p>
              <p className="mt-5 border-t border-rule pt-4 text-xs text-slate">
                {article.publishedAt} · {article.readTime}
              </p>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <PendingNote>
            The first articles are in progress — covering NDPA obligations, the CBN risk-based
            cybersecurity framework, and what enforcement activity means for Nigerian
            organisations. Check back shortly.
          </PendingNote>
        </div>
      )}
    </div>
  );
}
