export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  certifications: string[];
  photo?: string;
};

export const CREDENTIALS_CONFIRMED = true;

export const YEARS_OPERATING: number | null = 6;

export const TEAM: TeamMember[] = [
  {
    name: "Adaeze Okonkwo",
    role: "Principal Consultant",
    bio: "Leads engagement scoping and final reporting. Focused on turning technical findings into decisions boards can act on.",
    certifications: ["CISSP", "CISM", "ISO 27001 Lead Auditor"],
  },
  {
    name: "Priya Nair",
    role: "Senior Security Analyst",
    bio: "Runs technical assessments network testing, vulnerability scoring and control verification across banking and fintech clients.",
    certifications: ["CEH", "OSCP", "CompTIA Security+"],
  },
  {
    name: "Elena Novak",
    role: "Compliance Lead",
    bio: "Maps client environments against UK GDPR, ISO 27001 and Cyber Essentials, and owns gap closure tracking through to sign off.",
    certifications: ["CISA", "ISO 27001 Lead Implementer"],
  },
  {
    name: "Kwame Mensah",
    role: "Training Lead",
    bio: "Designs and delivers the awareness, incident-response and executive briefing tracks, tailoring each session to the client's actual risk exposure rather than a generic curriculum.",
    certifications: ["CISSP", "PMP"],
  },
];
