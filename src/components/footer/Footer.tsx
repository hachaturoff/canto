import twitter from "../../img/twitter.svg";
import discord from "../../img/discord.svg";
import opensea from "../../img/OpenSea_icon.svg";
import './style/Footer.css'

function Footer() {
    return (
        <>
            <footer className='footer'>
                <div>
                    <a href="https://twitter.com/bullishbytes" target="_blank" rel="noreferrer"> <img src={twitter} alt="twitter"></img></a>
                    <a href="https://discord.gg/yvSuHqpzX6" target="_blank" rel="noreferrer"> <img src={discord} alt="discordr"></img></a>
                    <a href="https://opensea.io/collection/bullishbytes" target="_blank" rel="noreferrer"> <img src={opensea} alt="opensea"></img></a>
                </div>
                <span>@2023 Doge BullishBytes All Rights Reserved</span>
            </footer>
        </>
    )
}

export default Footer