import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Providers from "./components/Providers";
import { getSession } from "@/lib/session";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://addis-eats.vercel.app"),
  title: {
    default: "Addis-Eats — Order Food in Addis Ababa",
    template: "%s | Addis-Eats",
  },
  description: "Discover and order delicious food in Addis Ababa.",
  openGraph: {
    siteName: "Addis-Eats",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Addis-Eats" }],
  },
};

export default async function RootLayout({ children }) {
  const session = await getSession();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-orange-50">
        <Providers>
          <main className="flex-1">
            <Navbar role={session?.role} user={session ? { email: session.email } : null} />
            {children}
            <Footer />
          </main>
        </Providers>
      </body>
    </html>
  );
}
//
