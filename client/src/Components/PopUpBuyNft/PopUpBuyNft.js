import React, {useState, useEffect} from "react";
import "./PopUpBuyNft.css";
import Cross from "../../Assets/Image/cross.svg";
import Button from "../Button/Button";
import useEth from "../../contexts/EthContext/useEth";
import Web3 from "web3";
const PopUpBuyNft = () => {
  // API CoinGecko
  const [ethPrice, setEthPrice] = useState("");
  // API Coingecko --> Get ETH price
  useEffect(() => {
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=eur"
    )
      .then((response) => response.json())
      .then((data) => setEthPrice(data.ethereum.eur))
      .catch((error) => console.log(error));
  }, []);
  const data = {
    nft: {
      img: "https://i.imgur.com/e1wX6tG.png",
      title: "Explore the world with Alexia Barrier",
      athlete: "Alexia Barrier",
      priceinEth: "1.0582",
    },
  };
  let ethFeesPriceConverted = (0.01123 * ethPrice).toLocaleString('fr-FR', { maximumFractionDigits: 1 });
  let ethPayPriceConverted = (1.06713 * ethPrice).toLocaleString('fr-FR', { maximumFractionDigits: 1 });
  let ethPriceConvertedBeforeTax = (data.nft.priceinEth * ethPrice).toLocaleString('fr-FR', { maximumFractionDigits: 1 });

  const {state:{web3, accounts, contract}, marketplaceAddress} = useEth()

  const handleBuyListingClick = async () => {
    console.log('proceed to payment clicked');
    const artifacts = require("../../contracts/Sofan.json")
    const {abi} = artifacts
    const web3MarketplaceInstance = new web3.eth.Contract(abi, marketplaceAddress)
      try {
        // param 1: address of nft seller 2: index of listing
        // load seller when pop up loading
        const result = await web3MarketplaceInstance.methods.buyListing("", 0)
        if(result.status){
          console.log("buy listing success");
        }else{
          console.log("buy listing error");
        }
      } catch (error) {
        console.log(error);
      }
  }


  return (
    <div className="popupbuynft-component">
      <div className="popubuynft-title-container">
        <span>Buy NFT</span>
        {/* <img src={Cross} alt="cross" /> */}
      </div>
      <div className="popubuynft-nftinfo-container">
        <div className="popubuynft-nftinfo-container-left">
          <img src={data.nft.img} alt="nft displayed" />
          <div className="popubuynft-nftinfo-container-left-info">
            <span>{data.nft.title}</span>
            <span>{data.nft.athlete}</span>
          </div>
        </div>
        <div className="popubuynft-nftinfo-container-right">
          <span> {ethPriceConvertedBeforeTax} €</span>
          <span>{data.nft.priceinEth} ETH</span>
        </div>
      </div>
      <div className="popupbuynft-fees-container">
        <div className="popupbuynft-fees-container-servicefee-wrap">
          <span>Service fee 5%</span>
          <div>
            <span>0.01123 ETH</span>
            <span> {ethFeesPriceConverted} €</span>
          </div>
        </div>
        <div className="popupbuynft-fees-container-servicefee-wrap">
          <span>You will pay</span>
          <div>
            <span>1.06713 ETH</span>
            <span> {ethPayPriceConverted} €</span>
          </div>
        </div>
      </div>
      <Button 
      onClick={handleBuyListingClick}
      hover="button-hover-props"
      text="Procéder au paiement" style={popUpBuyNftPaymentButton} />
    </div>
  );
};

export default PopUpBuyNft;

const popUpBuyNftPaymentButton = {
  background: "#F6D463",
  border: "transparent",
  borderRadius: "9.05759px",
  width: "468px",
  height: "56px",
  fontSize: "16px",
  lineHeight: "21px",
  fontWeight: "700",
  fontFamily: "Lufga",
  marginTop: "30px",
  marginBottom: "30px"
};
