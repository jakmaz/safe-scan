import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import SafeScan from "@/components/safescan";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen max-w-7xl p-4 mx-auto bg-background">
      <Navbar />
      <SafeScan />
      <Footer />
    </div>
  );
}
