import React, { useEffect, useState } from "react";
import "./AthleteProfileNFTCollection.css";
import AthleteProfileNFTCollectionTemplate from "./AthleteProfileNFTCollectionTemplate/AthleteProfileNFTCollectionTemplate";
const AthleteProfileNFTCollection = () => {
  const [dataAthleteProfilePageConcat, setDataAthleteProfilePageConcat] =
    useState(); // sera dans le composant de la page Athlete

  useEffect(() => {
    const data = {
      user: "Romain Attanasio",
      event: [
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
        {
          banner: "https://i.imgur.com/2ybztrG.png",
          profilePicture: "https://i.imgur.com/zH10SHj.png",
          title: "THE VENDEE GLOBE 2022",
          nftNumber: "5405",
          nftPriceEth: "0.01",
        },
      ],
    };
    setDataAthleteProfilePageConcat(data);
  }, []);
  return (
    <div className="athleteprofilenftcollection-component">
      {dataAthleteProfilePageConcat?.event.map((event) => (
        <AthleteProfileNFTCollectionTemplate eventData={event} />
      ))}
      {dataAthleteProfilePageConcat?.event.length % 2 !== 0 && <AthleteProfileNFTCollectionTemplate isTransparent={true} />}
    </div>
  );
};

export default AthleteProfileNFTCollection;
