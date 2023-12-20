import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, sepolia, WagmiConfig } from "wagmi";
import {
  mainnet,
  optimism,
  base,
  zora,
  optimismGoerli,
  baseGoerli,
  zoraTestnet,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const isTestnet = process.env.NEXT_PUBLIC_TESTNET;
const finalChains = [
  isTestnet ? sepolia : mainnet,
  isTestnet ? optimismGoerli : optimism,
  isTestnet ? baseGoerli : base,
  isTestnet ? zoraTestnet : zora,
];

const { chains, publicClient } = configureChains(finalChains, [
  alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
  publicProvider(),
]);
const { connectors } = getDefaultWallets({
  appName: "SUBPARTICLES",
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string,
  chains,
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider modalSize="compact" chains={chains}>
        <Component {...pageProps} />;
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
