import "./globals.css";

export const metadata = {
  title: "Staycation Villas - Stay Relax",
  description:
    "Handpicked staycations across India. Book luxury villas, holiday homes, and premium stays in Goa, Alibaug, Lonavala, Igatpuri, Karjat, and more.",
  keywords:
    "villas in India, luxury villas, holiday homes, Goa villas, Alibaug villas, Lonavala stays, Staycation Villas, staycation India",
  openGraph: {
    title: "Staycation Villas - Stay Relax",
    description:
      "Handpicked staycations across India. Book luxury villas and holiday homes in Goa, Alibaug, Lonavala, and more.",
    type: "website",
    locale: "en_IN",
    siteName: "Staycation Villas",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <meta name="theme-color" content="#1a1a1a" />
      </head>
      <body>{children}</body>
    </html>
  );
}
