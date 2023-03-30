import React from "react";
import NftCardTemplate from "../NftCard/NftCardTemplate/NftCardTemplate";
import "./NftCollectionMoreAboutNft.css";
import { v4 as uuidv4 } from "uuid";
function NftCollectionMoreAboutNft({
  adaptTitleToNftCollectionPageItems,
  nftsFromOwner,
}) {
  // console.log(adaptTitleToNftCollectionPageItems);
  // console.log(nftsFromOwner)
  const dataBackendNftCollectionMoreAboutNft = {
    nftCard: [
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
      {
        nftImage:
          "https://i.seadn.io/gcs/files/dac49567c59c19147360a378c38b485d.jpg?w=500&auto=format",
        collectionName: "Explore the World with Alexia Barrier",
        nftId: 390,
        ethPrice: 0.61,
        highestBidEth: 0.03,
      },
    ],
  };
  //
  // function NftCollectionMoreAboutNft({ nftCard }) {
    // console.log(nftsFromOwner)
  return (
    <section className="nft-collection-more-about-nft-container">
      <div className="nft-collection-more-about-nft-wrap">
        {adaptTitleToNftCollectionPageItems ? (
          <></>
        ) : (
          <div className="nft-collection-more-about-nft-title-and-button">
            <div className="nft-collection-more-about-nft-title">
              More about the NFT collection
            </div>
            <div className="nft-collection-more-about-title-button">
              <button>Voir tout</button>
            </div>
          </div>
        )}
        <div className="nft-collection-more-about-nft-card-container">
          {nftsFromOwner?.map((element, i, apiNftData) => (
            <NftCardTemplate
              fontStyle="nftcardtemplate-container-content-title-props"
              img={element.nftImage}
              title={element.collectionName}
              id={element.nftId}
              price={element.ethPrice}
              bid={element.highestBidEth}
              //
              nftsFromOwnerImage={apiNftData[i]?.contract?.openSea?.imageUrl}
              nftsFromOwnerNameCollectionName={apiNftData[i]?.contract?.name}
              nftsFromOwnerFloorPrice={
                apiNftData[i]?.contract?.openSea?.floorPrice
              }
              nftsFromOwnerTotalSupply={apiNftData[i]?.contract?.totalSupply}
              // mettre le nombre de nft de la collection correspondante
              key={uuidv4()}
              // collectionFloorPriceApiData={collectionFloorPriceApiData}
              // nftDataApi={nftDataApi?.ownedNfts[i]}
              // collectionData={collection}
            />
          ))}

          {dataBackendNftCollectionMoreAboutNft.nftCard?.length % 4 === 1 && (
            <>
              <NftCardTemplate isTransparent={true} />
              <NftCardTemplate isTransparent={true} />
              <NftCardTemplate isTransparent={true} />
            </>
          )}
          {dataBackendNftCollectionMoreAboutNft.nftCard?.length % 4 === 2 && (
            <>
              <NftCardTemplate isTransparent={true} />
              <NftCardTemplate isTransparent={true} />
            </>
          )}
          {dataBackendNftCollectionMoreAboutNft.nftCard?.length % 4 === 3 && (
            <NftCardTemplate isTransparent={true} />
          )}
        </div>
      </div>
    </section>
  );
}

export default NftCollectionMoreAboutNft;
