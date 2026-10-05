import type { Metadata } from "next";
import "./globals.css";
import { PERSONAL_INFO } from "@/lib/data";

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulthakur.dev"),
  title: "Rahul Thakur | Software Engineer • AI/ML • Full-Stack Developer",
  description: "Official portfolio of Rahul Thakur, Software Engineer specializing in scalable full-stack applications, distributed systems, and modern AI/ML inference architectures.",
  keywords: [
    "Rahul Thakur",
    "Rahul Thakur Software Engineer",
    "Rahul Thakur Developer",
    "Software Engineer Portfolio",
    "AI Developer",
    "Full Stack Developer",
    "Machine Learning Engineer",
    "FastAPI Python Developer",
    "Next.js Developer Greater Noida",
  ],
  authors: [{ name: "Rahul Thakur", url: "https://github.com/rahul000025" }],
  creator: "Rahul Thakur",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahulthakur.dev",
    title: "Rahul Thakur | Software Engineer • AI/ML • Full-Stack Developer",
    description: "I build intelligent, scalable and beautifully engineered digital experiences.",
    siteName: "Rahul Thakur Portfolio",
    images: [
      {
        url: "/rahul.jpg",
        width: 1200,
        height: 630,
        alt: "Rahul Thakur - Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Thakur | Software Engineer • AI/ML",
    description: "I build intelligent, scalable and beautifully engineered digital experiences.",
    creator: "@rahulkr568579",
    images: ["/rahul.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PERSONAL_INFO.name,
    jobTitle: "Software Engineer",
    description: PERSONAL_INFO.bioHeadline,
    url: "https://rahulthakur.dev",
    sameAs: [
      PERSONAL_INFO.socialLinks.github,
      PERSONAL_INFO.socialLinks.linkedin,
      PERSONAL_INFO.socialLinks.twitter,
      PERSONAL_INFO.socialLinks.instagram,
      PERSONAL_INFO.socialLinks.facebook,
    ],
    knowsAbout: [
      "Artificial Intelligence",
      "Machine Learning",
      "Full-Stack Web Development",
      "Distributed Systems",
      "Cybersecurity",
      "Python",
      "FastAPI",
      "Next.js",
      "React",
      "MySQL",
      "MongoDB",
    ],
  };

  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-dark-950 text-slate-100 antialiased selection:bg-indigo-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
