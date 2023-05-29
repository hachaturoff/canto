import { ConnectButton } from "@rainbow-me/rainbowkit";

const Button = () => {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
            }) => {
                // Note: If your app doesn't use authentication, you
                // can remove all 'authenticationStatus' checks
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');
                return (
                    <>
                        {(() => {
                            if (chain?.unsupported) return <span></span>
                            if (connected) return <ConnectButton accountStatus="address" />
                            if (!connected) return <span></span>
                        })()}
                    </>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default Button