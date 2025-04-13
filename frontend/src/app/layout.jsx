import "./globals.css";

export const metadata = {
  title: "TODO App",
  description: "Track your todos with style!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
