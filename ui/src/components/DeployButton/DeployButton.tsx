import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useCreate1155Contract, useEthersSigner } from "onchain-magic";

const DeployButton = () => {
  const signer = useEthersSigner();
  const { deploy } = useCreate1155Contract();
  const { openConnectModal } = useConnectModal();

  const handleClick = async () => {
    if (!signer) {
      openConnectModal?.();
      return;
    }
    const response = await deploy();
    console.log("SWEETS RESPONSE", response);
  };

  return (
    <button
      onClick={handleClick}
      className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
    >
      <h2 className={`mb-3 text-2xl font-semibold`}>
        Deploy{" "}
        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
          -&gt;
        </span>
      </h2>
      <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        Instantly deploy your Particle design onchain with Zora.
      </p>
    </button>
  );
};

export default DeployButton;
