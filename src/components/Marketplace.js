import Navbar from "./Navbar";
import NFTTile from "./NFTTile";
import MarketplaceJSON from "../Marketplace.json";
import axios from "axios";
import { useState } from "react";
import loading from '../loading.jpeg';
import "../App.css";
export default function Marketplace() {
    const sampleData = [
        {
            "name": "",
            "description": "",
            "website": "http://axieinfinity.io",
            "image": loading,
            "price": "0.03ETH",
            "currentlySelling": "True",
            "address": "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
        },

    ];
    const [data, updateData] = useState(sampleData);
    const [dataFetched, updateFetched] = useState(false);

    async function getAllNFTs() {
        const ethers = require("ethers");
        //After adding your Hardhat network to your metamask, this code will get providers and signers
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        //Pull the deployed contract instance
        let contract = new ethers.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
        //create an NFT Token
        let transaction = await contract.getAllNFTs()

        //Fetch all the details of every NFT from the contract and display
        const items = await Promise.all(transaction.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId);
            let meta = await axios.get(tokenURI);
            meta = meta.data;

            let price = ethers.utils.formatUnits(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.image,
                name: meta.name,
                description: meta.description,
            }
            return item;
        }))

        updateFetched(true);
        updateData(items);
    }

    if (!dataFetched)
        getAllNFTs();

    return (
        <div>
            <Navbar></Navbar>
            <div className="flex flex-col place-items-center mt-20">
                <div className="md:text-xl font-bold text-white align-middle content-start justify-center">
                    Create Emojis using following tools and upload them
                    <br />
                    to get ownership.
                    {/* <link>https://filmora.wondershare.com/animated-video/best-emoji-maker-to-create-emoji.html#emoji%20maker1</link> */}
                    <br />
                    <br />

                    <ol>
                        <li>  <a href="https://emoji-maker.com/" target="_blank" className="box" >Emoji-maker</a>  </li>
                        <br />

                        <li><a href="https://www.pizap.com/emoji_maker" target="_blank" className="box" >pizap</a></li>
                        <br />

                        <li><a href="https://emoji-maker.flat-icons.com/" target="_blank" className="box" >Falt-emojs</a></li>
                        <br />

                        <li><a href="https://labeley.com/emojis" target="_blank" className="box">labeley</a></li>
                        <br />

                        <li><a href="https://emoji-maker.com/" target="_blank" className="box" >Emoji-maker</a></li>
                        <br />

                    </ol>
                </div>
                <div className="md:text-xl font-bold text-white">
                    Emojis created by our users
                </div>
                <div className="flex mt-5 justify-between flex-wrap max-w-screen-xl text-center">
                    {data.map((value, index) => {
                        return <NFTTile data={value} key={index}></NFTTile>;
                    })}
                </div>
            </div>
        </div>
    );

}