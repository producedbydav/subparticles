import { Inter } from "next/font/google";
import DeployButton from "@/components/DeployButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { DeployProvider } from "@/providers/DeployContext";
import CoverArtUploadButton from "@/components/CoverArtUploadButton";

const inter = Inter({ subsets: ["latin"] });

const Home = () => (
  <main
    className={`flex min-h-screen flex-col items-center justify-center gap-11 ${inter.className}`}
  >
    <DeployProvider>
      <ConnectButton />
      <CoverArtUploadButton />
      <DeployButton />
    </DeployProvider>
  </main>
);

export default Home;
