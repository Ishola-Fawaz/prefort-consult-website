export type ProofItem = {
  description: string;
  outcome: string;
};

// Placeholder proof — added at the user's request to fill out the design for
// a presentation. Real named logos or anonymised client descriptions are
// still blocked on client input — scope §11 item 8. Swap these for the
// confirmed items (or flip this back to false) before launch; see the
// "Definition of done" list in the technical spec (no unfilled placeholders
// in production).
export const PROOF_CONFIRMED = true;

export const PROOF_ITEMS: ProofItem[] = [
  {
    description: "Mid-sized fintech, pre-Series A, ahead of an investor security review.",
    outcome: "14 of 16 critical findings closed within 60 days.",
  },
  {
    description: "Regional bank preparing for a CBN compliance audit.",
    outcome: "Gap report delivered in 3 weeks; audit passed with no critical findings.",
  },
  {
    description: "Healthcare provider handling patient data under NDPA.",
    outcome: "Full control set implemented and verified within one quarter.",
  },
];
