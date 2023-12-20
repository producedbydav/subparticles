import { optimism, sepolia } from "viem/chains";

const getFixedPriceSaleStrategy = (chainId: number) => {
    switch(chainId) {
        case optimism.id:
            return "0x3678862f04290E565cCA2EF163BAeb92Bb76790C"
        case sepolia.id:
            return "0xA5E8d0d4FCed34E86AF6d4E16131C7210Ba8b4b7"
        default:
            return "0x04E2516A2c207E84a1839755675dfd8eF6302F0a"
    }
}

export default getFixedPriceSaleStrategy