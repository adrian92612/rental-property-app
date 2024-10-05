import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Libre_Baskerville, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { metadata } from "@/lib/metadata";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["800", "900", "500", "700"],
  variable: "--font-montserrat",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
});

export const pageMetadata = metadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <body
        className={
          "font-libreBaskerville antialiased max-w-screen-2xl 2xl:mx-auto 2xl:border-x-2 bg-background text-primary "
        }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
