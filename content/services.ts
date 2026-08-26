export type Service = {
  slug: string;
  severity: "signal" | "caution" | "cleared";
  tag: string;
  title: string;
  summary: string;
  deliverable: string;
  detail?: string[];
};

export const SERVICES: Service[] = [
  {
    slug: "risk-assessment",
    severity: "signal",
    tag: "Start here",
    title: "Risk assessment",
    summary:
      "A structured review of where your organisation is exposed. Systems, access, process and people ranked by risk likelihood and impact, not by how alarming it sounds.",
    deliverable:
      "A ranked risk register with findings, severity and recommended remediation order.",
  },
  {
    slug: "gap-analysis",
    severity: "caution",
    tag: "Compliance",
    title: "Gap analysis",
    summary:
      "A control by control analysis of current practice against the standard you're working toward (UK GDPR), (ISO 27001), (PCI DSS) or Cyber Essentials with what's missing made explicit.",
    deliverable:
      "A control by control gap report mapped to the chosen standard, with an owner and effort estimate per gap.",
  },
  {
    slug: "vulnerability-assessment",
    severity: "signal",
    tag: "Technical",
    title: "Vulnerability assessment",
    summary:
      "Identification of weaknesses across your enterprise assets, scored by how easily each could be exploited and what it would cost you if it were.",
    deliverable:
      "A vulnerability register, scored and ranked, with a remediation timeframe for each finding.",
  },
  {
    slug: "network-protection",
    severity: "cleared",
    tag: "Ongoing",
    title: "Network protection",
    summary:
      "Implementation and monitoring of the controls a risk assessment or gap analysis marks as priority, like access hardening, backup verification, monitoring handed over with evidence it works.",
    deliverable:
      "A closure statement confirming each agreed control is in place, with the evidence behind it.",
  },
];
