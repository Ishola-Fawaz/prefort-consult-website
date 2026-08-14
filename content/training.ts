export type TrainingTrack = {
  slug: string;
  duration: string;
  audience: string;
  title: string;
  summary: string;
  outcomes: string[];
};

// Duration, delivery format, price and certification issued are blocked on
// client input — scope §11 item 9. Marked explicitly rather than guessed.
export const TRAINING_TRACKS: TrainingTrack[] = [
  {
    slug: "awareness",
    duration: "Duration to be confirmed",
    audience: "All staff",
    title: "Security awareness",
    summary:
      "Practical training on the everyday habits that cause most breaches — phishing, password reuse, unsecured file sharing.",
    outcomes: [
      "Staff can identify a phishing attempt",
      "Shared credentials and personal-email workarounds are retired",
      "A documented record of who's been trained, and when",
    ],
  },
  {
    slug: "incident-response",
    duration: "Duration to be confirmed",
    audience: "IT and operations leads",
    title: "Incident response",
    summary:
      "What to do in the first hour after something goes wrong, and who is responsible for each step.",
    outcomes: [
      "A written incident response plan with named owners",
      "A tested escalation path",
      "A team that has rehearsed it, not just read it",
    ],
  },
  {
    slug: "executive-briefing",
    duration: "Duration to be confirmed",
    audience: "Leadership and board",
    title: "Executive briefing",
    summary:
      "A non-technical briefing on organisational exposure, regulatory obligation, and what governance looks like in practice.",
    outcomes: [
      "Leadership can state the organisation's top three exposures",
      "Clarity on who is accountable when something goes wrong",
      "A shared understanding of NDPA and sector-specific obligations",
    ],
  },
];
