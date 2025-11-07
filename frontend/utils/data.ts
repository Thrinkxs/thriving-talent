export type JobType = (typeof FAKE_JOBS)[number];

export const FAKE_JOBS = [
  {
    id: 1,
    company: "Asana",
    logo: "asana",
    title: "UI/UX Designer",
    location: "27 tokyo street, Osaka Japan",
    type: "full time",
    applied: 29,
    daysLeft: 2,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim, ea rem a",
    fullDescription:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim, ea rem a. We are looking for a talented UI/UX Designer to join our team.",
    qualifications: [
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim.",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim.",
      "Strong portfolio demonstrating design expertise",
    ],
    category: "Design",
    salary: "$80k - $120k",
  },
  {
    id: 2,
    company: "Google",
    logo: "google",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "full time",
    applied: 45,
    daysLeft: 5,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim, ea rem a",
    fullDescription:
      "We are seeking an experienced Frontend Developer to build cutting-edge web applications. You'll work with React, TypeScript, and modern tooling.",
    qualifications: [
      "5+ years of experience with React and TypeScript",
      "Strong understanding of web performance optimization",
      "Experience with modern build tools and CI/CD",
    ],
    category: "Engineering",
    salary: "$120k - $180k",
  },
  {
    id: 3,
    company: "Microsoft",
    logo: "microsoft",
    title: "Product Manager",
    location: "Seattle, WA",
    type: "full time",
    applied: 38,
    daysLeft: 3,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim, ea rem a",
    fullDescription:
      "Join our product team to drive strategy and execution for our cloud services platform. Work with cross-functional teams to deliver world-class products.",
    qualifications: [
      "3+ years of product management experience",
      "Strong analytical and communication skills",
      "Experience with cloud technologies",
    ],
    category: "Product",
    salary: "$100k - $150k",
  },
  {
    id: 4,
    company: "Asana",
    logo: "asana",
    title: "Backend Engineer",
    location: "Remote",
    type: "remote",
    applied: 52,
    daysLeft: 7,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim, ea rem a",
    fullDescription:
      "Build scalable backend systems that power collaboration for millions of users. Work with Node.js, GraphQL, and distributed systems.",
    qualifications: [
      "Strong experience with Node.js and databases",
      "Understanding of distributed systems",
      "Experience with API design and microservices",
    ],
    category: "Engineering",
    salary: "$110k - $160k",
  },
  {
    id: 5,
    company: "Meta",
    logo: "meta",
    title: "Data Scientist",
    location: "New York, NY",
    type: "full time",
    applied: 31,
    daysLeft: 4,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim, ea rem a",
    fullDescription:
      "Apply machine learning and statistical analysis to solve complex business problems. Work with massive datasets to drive product decisions.",
    qualifications: [
      "PhD or Masters in Computer Science, Statistics, or related field",
      "Strong Python and SQL skills",
      "Experience with ML frameworks like TensorFlow or PyTorch",
    ],
    category: "Data",
    salary: "$130k - $190k",
  },
  {
    id: 6,
    company: "Amazon",
    logo: "amazon",
    title: "DevOps Engineer",
    location: "Austin, TX",
    type: "full time",
    applied: 27,
    daysLeft: 6,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim, ea rem a",
    fullDescription:
      "Build and maintain cloud infrastructure at scale. Automate deployment pipelines and ensure high availability of critical services.",
    qualifications: [
      "Experience with AWS, Docker, and Kubernetes",
      "Strong scripting skills (Python, Bash)",
      "Knowledge of CI/CD tools and practices",
    ],
    category: "Engineering",
    salary: "$100k - $145k",
  },
  {
    id: 7,
    company: "Stripe",
    logo: "stripe",
    title: "Mobile Developer",
    location: "Remote",
    type: "contract",
    applied: 19,
    daysLeft: 8,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim, ea rem a",
    fullDescription:
      "Develop beautiful, performant mobile applications for iOS and Android. Work with React Native and native code when needed.",
    qualifications: [
      "3+ years of mobile development experience",
      "Proficiency in React Native or Flutter",
      "Understanding of mobile UI/UX best practices",
    ],
    category: "Engineering",
    salary: "$90k - $130k",
  },
  {
    id: 8,
    company: "Asana",
    logo: "asana",
    title: "Marketing Manager",
    location: "Los Angeles, CA",
    type: "full time",
    applied: 41,
    daysLeft: 3,
    description:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloremque atque, praesentium quam iure magnam quas enim, ea rem a",
    fullDescription:
      "Lead marketing campaigns to drive user acquisition and engagement. Work closely with product and design teams to create compelling content.",
    qualifications: [
      "5+ years of B2B marketing experience",
      "Strong analytical and creative skills",
      "Experience with marketing automation tools",
    ],
    category: "Marketing",
    salary: "$85k - $125k",
  },
];
