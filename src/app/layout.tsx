import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bharath-eee.github.io/Portfolio"),
  title: "Bharath Suresh | Electrical Engineering, AI, IoT & Robotics",
  description:
    "Electrical and Electronics Engineering student exploring how AI, IoT, embedded systems, and robotics work together to build intelligent, real-world solutions.",
  keywords: [
    "Bharath Suresh",
    "Electrical Engineering",
    "Artificial Intelligence",
    "IoT",
    "Robotics",
    "Embedded Systems",
    "ESP32",
    "Arduino",
    "Local LLM",
    "TinyML",
  ],
  authors: [{ name: "Bharath Suresh", url: "https://github.com/bharath-eee" }],
  creator: "Bharath Suresh",
  icons: {
    icon: "/Portfolio/favicon.svg",
  },
  openGraph: {
    title: "Bharath Suresh | Electrical Engineering, AI, IoT & Robotics",
    description:
      "Electrical Engineering meets Artificial Intelligence. Explore projects in IoT, embedded systems, robotics, and intelligent automation.",
    url: "https://bharath-eee.github.io/Portfolio",
    siteName: "Bharath Suresh — Portfolio",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharath Suresh | Electrical Engineering, AI, IoT & Robotics",
    description:
      "Electrical Engineering meets Artificial Intelligence — projects in IoT, embedded systems, robotics, and intelligent automation.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF9" },
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
