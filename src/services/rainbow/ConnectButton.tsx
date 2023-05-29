import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAppSelector } from '../../store/hooks';

interface IProps {
    onClick?: () => void,
    isActive: boolean,
    text?: string,
}

const CustomConnectButton = ({
    onClick,
    isActive,
    text,
}: IProps) => {
    const {
        ethAddress
    } = useAppSelector(state => state.user)

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
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                    ready &&
                    account &&
                    chain &&
                    (!authenticationStatus ||
                        authenticationStatus === 'authenticated');

                return (
                    <div
                        style={{ maxWidth: '455px', width: '100%' }}
                        {...(!ready && {
                            'aria-hidden': true,
                            'style': {
                                opacity: 0,
                                pointerEvents: 'none',
                                userSelect: 'none',
                            },
                        })}
                    >
                        {(() => {
                            if (!ethAddress) {
                                return (
                                    <div className="mint-btn margin-btn" onClick={openConnectModal}>
                                        Connect Your Wallet
                                    </div>
                                )
                            }

                            if (!connected) {
                                return (
                                    <div className="mint-btn" onClick={openConnectModal}>
                                        Connect Your Wallet
                                    </div>
                                );
                            }

                            if (chain.unsupported) {
                                return (
                                    <div className="mint-btn" onClick={openChainModal}>
                                        Wrong network
                                    </div>
                                );
                            }

                            if (!isActive) {
                                return (
                                    <div className="mint-btn">
                                        Sale is not started
                                    </div>
                                )
                            }

                            if (connected) {
                                return (
                                    <div onClick={() => {
                                        if (!isActive) return
                                        if (onClick) onClick()
                                    }} className={'mint-btn'}>
                                        <span>{text}</span>
                                    </div>
                                )
                            }
                        })()}
                    </div>
                );
            }}
        </ConnectButton.Custom>
    )
}

export default CustomConnectButton