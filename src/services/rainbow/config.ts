import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient, mainnet } from "wagmi";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { getEnv } from "../../utils";
import { metaMaskWallet, walletConnectWallet, coinbaseWallet, injectedWallet, trustWallet } from '@rainbow-me/rainbowkit/wallets';

const alchemyApiKey = getEnv(process.env.REACT_APP_ALCHEMY_KEY, 'REACT_APP_ALCHEMY_KEY')

export const { chains, provider } = configureChains(
    [mainnet],
    [
        alchemyProvider({ apiKey: alchemyApiKey }),
        publicProvider()
    ]
);

const connectors = connectorsForWallets([
    {
        groupName: 'Recommended',
        wallets: [
            metaMaskWallet({ chains }),
            trustWallet({ chains })
        ]
    }
])

export const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
})