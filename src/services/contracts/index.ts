import Web3 from "web3"
import { getEnv } from "../../utils"
import abi from './abi.json'
import { AbiItem } from 'web3-utils/types'

const web3 = new Web3(Web3.givenProvider)
const contractAddress = getEnv(process.env.REACT_APP_CONTRACT_ADDRESS, 'REACT_APP_CONTRACT_ADDRESS')

const contract = new web3.eth.Contract(abi as AbiItem[], contractAddress)

export const getEthAddress = async () => {
    const address = await web3.eth.getAccounts()

    return address[0]
}

export const getChainId = async () => await window.ethereum.request({ method: 'eth_chainId' })

export const getTotalSupply = async () => await contract.methods.totalSupply().call()

export const getMaxSupply = async () => await contract.methods.maxSupply().call()

export const getMaxPerTx = async () => await contract.methods.maxPerTx().call()

export const getMaxPerWallet = async () => await contract.methods.maxPerWallet().call()

export const getMintPrice = async () => {
    const res = await contract.methods.cost().call()
    return web3.utils.fromWei(res)
}

export const getIsWhitelist = async () => await contract.methods.whitelistSale().call()

export const getIsSaleStarted = async () => await contract.methods.sale().call()

export const getIsAddressInWhiteList = async (address: string) => await contract.methods.whitelist(address).call()

export const mintZalPublic = async (txCount: number, address: string, cost: string) => {
    const value = web3.utils.toWei(cost)
    
    const res = await contract.methods.mint(txCount).send({
        from: address,
        value: `${Number(value) * txCount}`
    })

    return res
}

export const mintZalWhitelist = async (txCount: number, address: string, cost: string) => {
    const value = web3.utils.toWei(cost)

    console.log(txCount, `${Number(value) * txCount}`, address)
    
    const res = await contract.methods.mint2(txCount).send({
        from: address,
        value: `${Number(value) * txCount}`
    })

    return res
}

export const getMintedCount = async (address: string) => await contract.methods.balanceOf(address).call()

export const getWhitelistMinted = async (address: string) =>  await contract.methods.whitelistMinted(address).call()
export const getMaxPerWhitelistWallet = async () =>  await contract.methods.maxPerWhitelistWallet().call()