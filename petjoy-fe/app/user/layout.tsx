import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Petjoy",
  description: "Petjoy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="min-h-lvh">{children}</div>
      <Footer />
    </>
  );
}
