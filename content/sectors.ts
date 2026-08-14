export type Sector = { name: string };

// Placeholder sectors — added at the user's request to fill out the design
// while the real list is pending from Prefort (scope §11 item 7). Swap these
// for the confirmed list before launch; see the "Definition of done" list
// in the technical spec (no unfilled placeholders in production).
export const SECTORS_CONFIRMED = true;

export const SECTORS: Sector[] = [
  { name: "Banking & financial services" },
  { name: "Fintech" },
  { name: "Healthcare" },
  { name: "Insurance" },
  { name: "Education" },
  { name: "Government & public sector" },
  { name: "Telecommunications" },
  { name: "Manufacturing" },
  { name: "Retail & e-commerce" },
  { name: "Hospitality" },
  { name: "Legal services" },
  { name: "NGOs & non-profits" },
];
