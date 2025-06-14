import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ttNorms = localFont({
  src: './fonts/TTNorms.ttf',
  variable: "--font-tt-norms",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "MANUAL",
  description: "We’re working around the clock to bring you a holistic approach to your wellness. From top to bottom, inside and out.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ttNorms.variable}`}>
        <div className="appContainer">
          {children}
        </div>
      </body>
    </html>
  );
}
