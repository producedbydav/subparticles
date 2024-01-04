import { useConnectModal } from "@rainbow-me/rainbowkit";
import { Interface } from "ethers";
import {
  Create1155ContractArgs,
  store,
  uploadToIpfs,
  useCreate1155Contract,
  useEthersSigner,
} from "onchain-magic";
import { useAccount, useNetwork } from "wagmi";
import dropAbi from "../../lib/abi/Zora1155Drop.json";
import { useDeploy } from "@/providers/DeployContext";
import getFixedPriceSaleStrategy from "@/lib/zora/getFixedPriceSalesStrategy";
import getSalesConfig from "@/lib/zora/getSalesConfig";

const DeployButton = () => {
  const signer = useEthersSigner();
  const { deploy } = useCreate1155Contract();
  const { openConnectModal } = useConnectModal();
  const { address } = useAccount();
  const { cover } = useDeploy();
  const { chain } = useNetwork();

  const createJsonBlob = (obj: any) => {
    const jsonString = JSON.stringify(obj);

    return new Blob([jsonString], { type: "application/json" });
  };

  const handleClick = async () => {
    if (!signer) {
      openConnectModal?.();
      return;
    }
    const name = "SUBPARTICLES";
    const description = "CC0 ARTWORK built by dav & sweets";
    const ipfs = await uploadToIpfs(cover);
    console.log("SWEETS IPFS", ipfs);
    const newIpfs = await uploadToIpfs(
      createJsonBlob({
        image: `ipfs://${ipfs}`,
        name: "SUBPARTICLES",
        description: "CC0 ARTWORK built by dav & sweets",
        animation_url: `ipfs://bafybeih7kt7rrbwlc7kzdgmyz5gzamjp6jybma5ios2npcyvfihiftuzuu?img=https://nftstorage.link/ipfs/${ipfs}`,
        content: {
          mime: "application/zip",
          uri: `ipfs://bafybeih7kt7rrbwlc7kzdgmyz5gzamjp6jybma5ios2npcyvfihiftuzuu?img=https://nftstorage.link/ipfs/${ipfs}`,
        },
      })
    );
    console.log("SWEETS newIpfs", newIpfs);
    const saleStrategy = getFixedPriceSaleStrategy(chain?.id as number);
    const minterPermissionArgs = [0, saleStrategy, 4];
    const data = getSalesConfig(1, address as string);
    const callSaleArgs = [1, saleStrategy, data];
    const maxUint256 = BigInt(
      "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
    );
    const setupNewTokenArgs = [`ipfs://${newIpfs}`, maxUint256];
    const calls = [
      new Interface(dropAbi).encodeFunctionData(
        "addPermission",
        minterPermissionArgs
      ),
      new Interface(dropAbi).encodeFunctionData(
        "setupNewToken",
        setupNewTokenArgs
      ),
      new Interface(dropAbi).encodeFunctionData("callSale", callSaleArgs),
    ];
    const setupActions = calls;

    const args = {
      name,
      description,
      setupActions,
    } as Create1155ContractArgs;
    const response = await deploy(args);
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
