import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Timeless City — Build Your Medieval Empire | iOS Strategy Game",
  description:
    "Build, battle, and conquer in Timeless City — the ultimate medieval city-builder and strategy game for iOS. Spin the reels of fate, train your army, and rise to glory.",
  keywords: [
    "Timeless City",
    "iOS game",
    "medieval strategy",
    "city builder",
    "slot machine game",
    "mobile strategy game",
    "empire building",
    "medieval RPG",
    "Apple App Store game",
  ],
  authors: [{ name: "Timeless City" }],
  creator: "Timeless City",
  publisher: "Timeless City",
  metadataBase: new URL("https://thetimeless.city"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Timeless City — Build Your Medieval Empire",
    description:
      "Spin the reels of fate, build your kingdom, train your army, and conquer rivals in this epic medieval strategy game for iOS.",
    url: "https://thetimeless.city",
    siteName: "Timeless City",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Timeless City — Medieval Strategy Game",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Timeless City — Build Your Medieval Empire",
    description:
      "Spin the reels of fate, build your kingdom, and conquer rivals in this epic medieval strategy game for iOS.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              name: "Timeless City",
              operatingSystem: "iOS",
              applicationCategory: "GameApplication",
              description:
                "Build, battle, and conquer in Timeless City — the ultimate medieval city-builder and strategy game for iOS.",
              url: "https://thetimeless.city",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                ratingCount: "120",
              },
            }),
          }}
        />
      </head>
      <body
        className={`${cinzel.variable} ${inter.variable} antialiased bg-[#0a0a0f] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
