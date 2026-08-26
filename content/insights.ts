export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; attribution?: string };

export type Article = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  publishedAt: string;
  readTime: string;
  body: ArticleBlock[];
};

export const INSIGHTS_CONFIRMED = true;

export const ARTICLES: Article[] = [
  {
    slug: "risk-assessment-techniques",
    title: "Risk assessment techniques for cybersecurity",
    summary:
      "A working method for turning a long list of possible problems into a short, ranked list of the ones worth acting on first.",
    category: "Risk assessment",
    publishedAt: "7 July 2025",
    readTime: "4 min read",
    body: [
      {
        type: "paragraph",
        text: "A risk assessment is only useful if it ends in a ranked list, not a long document nobody re-reads. The method matters less than the discipline of finishing it: identify what you have, work out what could go wrong with it, and rank the results by how likely and how costly each scenario actually is.",
      },
      { type: "heading", text: "1. Identify the assets" },
      {
        type: "paragraph",
        text: "Start with what you're protecting, not what you're afraid of. That means systems, data stores, third-party integrations, and the people who can act on all of them. An asset you haven't listed is a risk you can't assess.",
      },
      { type: "heading", text: "2. Identify threats and vulnerabilities" },
      {
        type: "paragraph",
        text: "For each asset, ask what could go wrong (the threat) and what would let it happen (the vulnerability). A threat without an exploitable weakness is low priority; a weakness nobody would bother exploiting is lower still. It's the combination that matters.",
      },
      { type: "heading", text: "3. Score by likelihood and impact" },
      {
        type: "paragraph",
        text: "Qualitative scoring (low/medium/high) is faster and good enough for most organisations starting out. Quantitative scoring (estimated financial loss, probability over a time window) is more defensible when you need to justify budget. Either way, score likelihood and impact separately before combining them — a rare, catastrophic event and a common, minor one can land at the same score for very different reasons.",
      },
      { type: "heading", text: "4. Rank and register" },
      {
        type: "paragraph",
        text: "The output is a risk register: each finding, its score, and an owner. Rank order is the point — it tells you what gets fixed this quarter versus what gets monitored.",
      },
      {
        type: "paragraph",
        text: "Treat the register as a living document. New systems, new integrations and new regulatory requirements all change the ranking, so revisit it on a schedule rather than only after something goes wrong.",
      },
    ],
  },
  {
    slug: "cryptography",
    title: "Cryptography, in plain terms",
    summary:
      "What cryptography actually protects against, and the four properties confidentiality, integrity, non-repudiation, authentication that a good system needs all four of.",
    category: "Cryptography",
    publishedAt: "19 April 2023",
    readTime: "3 min read",
    body: [
      {
        type: "paragraph",
        text: 'Cryptography is the technique of securing information and communication through codes, so that only the people the information is intended for can read it. The word combines the Greek for "hidden" and "writing" — which is a fair description of what it does: convert a readable message into something unreadable to anyone without the key.',
      },
      {
        type: "paragraph",
        text: "Modern cryptography relies on mathematical algorithms — for key generation, digital signing, verification and encryption to support things like private data storage, secure browsing and confidential transactions such as card payments.",
      },
      { type: "heading", text: "The four properties" },
      {
        type: "list",
        items: [
          "Confidentiality — only the intended recipient can access the information.",
          "Integrity — the information is not altered in storage or in transit.",
          "Non-repudiation — the sender cannot later deny having sent it.",
          "Authentication — the identity of sender and receiver, and the origin of the message, can be confirmed.",
        ],
      },
      {
        type: "paragraph",
        text: "A system that only delivers confidentiality but not integrity, or authentication without non-repudiation, is incomplete each property covers a different failure mode, and dropping one reopens it. Encryption also underpins access control more broadly: a resource is only accessible to a party with both the right permissions and the correct key, which is what makes cryptography the basis for so much of practical information security rather than a niche within it.",
      },
    ],
  },
  {
    slug: "incident-response",
    title: "What an incident response plan actually needs to cover",
    summary:
      "Detecting a breach is only step one. What separates organisations that recover quickly from ones that don't is who's on the response team and what they're each responsible for.",
    category: "Incident response",
    publishedAt: "19 April 2023",
    readTime: "3 min read",
    body: [
      {
        type: "paragraph",
        text: "Incident response is an organisation's process and tooling for detecting and responding to security breaches, cyberattacks and other threats. The goal isn't only to prevent attacks — it's to minimise the cost and disruption of the ones that get through, because some will.",
      },
      {
        type: "paragraph",
        text: "A security incident is any digital or physical event that threatens the confidentiality, integrity or availability of information systems or data. That covers a wide range: a deliberate attack by an outside actor, but also an unintentional policy violation by someone with legitimate access. Both need a response, even though only one is malicious.",
      },
      { type: "heading", text: "Who owns the response" },
      {
        type: "paragraph",
        text: "Incident response plans are typically executed by a computer security incident response team (CSIRT) drawn from across the organisation — not just the CISO and SOC, but IT, legal, HR, compliance and executive leadership. Response is as much a coordination problem as a technical one: someone needs to decide what gets disclosed, to whom, and by when, while the technical team is still working out what happened.",
      },
      {
        type: "paragraph",
        text: "That's why the plan has to exist before the incident does. Deciding roles and communication lines in the middle of a live breach costs time you don't have.",
      },
    ],
  },
  {
    slug: "cybersecurity-basics",
    title: "Cybersecurity basics: why it's everyone's responsibility",
    summary:
      "Cybersecurity isn't a single problem with a single fix it's a collection of overlapping challenges. Here's how to start building the awareness that keeps most of them from becoming incidents.",
    category: "Cybersecurity basics",
    publishedAt: "17 March 2019",
    readTime: "3 min read",
    body: [
      {
        type: "paragraph",
        text: "A connected organisation opens up opportunity and exposure in roughly equal measure. Cybersecurity today isn't a single problem with a single fix it's a collection of overlapping challenges, from phishing and credential theft to misconfigured infrastructure, and none of them can be solved in isolation.",
      },
      {
        type: "quote",
        text: "Cyber security is the passport to the future, for tomorrow belongs to those who prepare for it today.",
        attribution: "Malcolm X",
      },
      {
        type: "paragraph",
        text: "That preparation starts with people, not tools. Strong analytical habits — noticing what's different from normal, staying current on how access and data-protection obligations apply to your organisation, and keeping a genuine interest in how the systems you rely on actually work — do more to reduce risk day to day than any single piece of software.",
      },
      {
        type: "paragraph",
        text: "Cybersecurity, at its core, is the application of processes and controls to protect systems, networks, software and data from attack. It doesn't eliminate risk, but it materially reduces how exploitable that risk is — which is the realistic goal.",
      },
    ],
  },
  {
    slug: "network-security",
    title: "Network security: protection, detection, reaction",
    summary:
      "Every organisation needs some level of network security. The three phases protection, detection and reaction — are the same regardless of size.",
    category: "Network security",
    publishedAt: "9 March 2019",
    readTime: "3 min read",
    body: [
      {
        type: "paragraph",
        text: "Network security combines the policies and controls that ensure only authorised users and devices reach network resources. Every organisation needs some level of it, regardless of size or industry — the difference is how deliberately it's designed rather than whether it's needed at all.",
      },
      {
        type: "paragraph",
        text: "Securing a network happens in three phases:",
      },
      {
        type: "list",
        items: [
          "Protection — making sure systems are configured correctly in the first place.",
          "Detection — identifying when a configuration changes or traffic indicates a problem.",
          "Reaction — responding quickly enough that the network returns to a safe state before damage compounds.",
        ],
      },
      {
        type: "paragraph",
        text: "Intrusion prevention systems sit in the detection and reaction phases: they identify known attack patterns — brute force attempts, denial-of-service traffic, exploitation of disclosed vulnerabilities — and block them automatically. That matters because there's often a real gap between a vulnerability being publicly disclosed and a patch being deployed, and attackers move fast in that window.",
      },
      {
        type: "paragraph",
        text: "Access control policy is the other half of the picture. Network access control can be set at a granular level — an administrator might get full access while being blocked from a specific confidential share, or a personal device might be denied network access entirely. None of this needs to be all-or-nothing.",
      },
    ],
  },
  {
    slug: "cloud-security",
    title: "Cloud security is a shared responsibility",
    summary:
      "Cloud security depends on both the provider and the client getting their half right and knowing which half is theirs.",
    category: "Cloud security",
    publishedAt: "9 March 2019",
    readTime: "2 min read",
    body: [
      {
        type: "paragraph",
        text: "Cloud security is the discipline of securing cloud computing systems keeping data private and safe across infrastructure, applications and platforms that you don't fully control. Securing it is a joint effort between the provider and whoever is using the service, whether that's an individual, a small business or a large enterprise.",
      },
      {
        type: "paragraph",
        text: "Providers host services on always-on infrastructure, and their business depends on customer trust — so a meaningful share of cloud security is built into the platform by default. But not all of it.",
      },
      {
        type: "quote",
        text: "Cloud security also partially rests in the client's hands. Understanding both halves is pivotal to a healthy cloud security posture.",
      },
      {
        type: "paragraph",
        text: "Ownership of any given control varies with the service model — what the provider secures under infrastructure-as-a-service is different from what they secure under software-as-a-service. That's why the first real step in cloud security isn't a tool, it's a clear answer to the question: for this specific service, which controls are ours to configure, and which are the provider's?",
      },
    ],
  },
  {
    slug: "application-security",
    title: "Application security basics",
    summary:
      "As applications move onto more networks and into the cloud, the surface area for attack grows with them. Here's where security needs to be built in, not bolted on.",
    category: "Application security",
    publishedAt: "17 May 2018",
    readTime: "2 min read",
    body: [
      {
        type: "paragraph",
        text: "Application security is the process of building, adding and testing security features within an application to prevent vulnerabilities — unauthorised access and modification chief among them. It matters more as applications spread across networks and into the cloud, since each new connection point is a new opportunity for something to go wrong.",
      },
      {
        type: "quote",
        text: "Cyber security is the passport to the future, for tomorrow belongs to those who prepare for it today.",
        attribution: "Malcolm X",
      },
      {
        type: "paragraph",
        text: "The main features are authentication, authorisation, encryption, logging and dedicated security testing — and developers can reduce a meaningful share of vulnerabilities just by how they write the code in the first place, before any of those features are added on top.",
      },
      {
        type: "paragraph",
        text: "Mobile applications carry extra exposure, since they transmit over the open internet rather than a private network — a VPN adds a layer of protection for anyone logging into applications remotely. Either way, application security testing belongs in the development process itself, not as a step tacked on afterward, and a security audit against a defined set of criteria is what confirms it actually worked.",
      },
    ],
  },
  {
    slug: "accelerated-cybersecurity-training",
    title: "What an information security manager actually does",
    summary:
      "A look at the competencies behind the information security manager role — from compliance and audit to vulnerability management and staff awareness.",
    category: "Training",
    publishedAt: "8 July 2025",
    readTime: "3 min read",
    body: [
      {
        type: "quote",
        text: "An information security manager takes responsibility for overseeing and controlling all aspects of computer security in a business. The job entails planning and carrying out security measures that will protect a business's data and information from deliberate attack, unauthorised access, corruption and theft.",
        attribution: "Randstad",
      },
      {
        type: "paragraph",
        text: "That single sentence covers a wide role. Broken down, the core competencies are:",
      },
      {
        type: "list",
        items: [
          "Establishing compliance guidelines for the regulations that apply to the business",
          "Running internal audits and compliance reviews",
          "Performing gap analysis against frameworks such as ISO 27001, ISO 27002, ISO 27005 and NIST CSF",
          "Reviewing organisational policies, procedures and guidelines",
          "Running risk assessments and choosing appropriate remediation",
          "Identifying vulnerabilities and addressing security weaknesses",
          "Meeting the regulatory standards that apply — data privacy, GDPR, HIPAA and equivalents",
          "Keeping staff aware of security policy and process",
          "Educating staff on information security risk and its legal implications",
        ],
      },
      {
        type: "paragraph",
        text: "The last two are easy to underweight next to the technical items, but staff awareness is usually where the gap actually is — most breaches start with a person, not a system.",
      },
    ],
  },
  {
    slug: "cloud-architect-training",
    title: "What a cloud architect needs to know beyond the technical",
    summary:
      "Designing resilient, secure, cost-optimised cloud architecture is only half the role. The other half is translating between technical and non-technical stakeholders.",
    category: "Training",
    publishedAt: "8 July 2025",
    readTime: "2 min read",
    body: [
      {
        type: "paragraph",
        text: "A cloud architect's technical remit is well understood: design resilient, high-performing, secure and cost-optimised architecture. What's less discussed is how much of the role sits outside the technical design itself.",
      },
      {
        type: "list",
        items: [
          "Bridging the communication gap between technical and non-technical stakeholders",
          "Working alongside the project management team rather than handing off to it",
          "Catching product-stakeholder misalignment before it becomes a rebuild",
          "Confirming the solution actually fits the purpose it was designed for",
          "Tailoring the architecture to the specific business need, not a generic best practice",
          "Defining functional requirements and implementation stages clearly enough that others can execute against them",
        ],
      },
      {
        type: "paragraph",
        text: "That combination — security engineers, compliance managers and risk officers all need to be able to work with an architect's output, not just read it — is what tends to separate an architecture that survives contact with the business from one that doesn't.",
      },
    ],
  },
];
