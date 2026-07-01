import "./globals.css";

export const metadata = {
  title: "Yamini Kalluri — Kuchipudi Dancer, Choreographer & Teacher",
  description:
    "Yamini Kalluri is a world-class Kuchipudi dancer based in the US where she teaches, performs and choreographs full-time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
