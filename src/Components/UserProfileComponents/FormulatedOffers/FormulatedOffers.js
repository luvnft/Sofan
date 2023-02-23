import React, { useState } from "react";
import DataTitles from "../DataTitles/DataTitles";
import NftList from "../NftList/NftList";
import "./FormulatedOffers.css";

function FormulatedOffers() {
  // Backend here
  const [currentStatusOffers, setCurrentStatusOffers] = useState({
    validate: false,
    pending: true,
    cancelled: false,
  });
  function displayCurrentOffersStatus() {
    if (currentStatusOffers.validate === true) {
      return "formulated-offers-status-validate";
    } else if (currentStatusOffers.pending === true) {
      return "formulated-offers-status-pending";
    } else if (currentStatusOffers.cancelled === true) {
      return "formulated-offers-status-cancelled";
    }
  }
  const nftListArray = Array.from({ length: 159 });
  return (
    <>
      <section className="formulated-offers-user-container">
        <DataTitles
          formulatedOffersYourOffersTitle="Your Offers"
          formulatedOffersFromTitle="From"
          formulatedOffersToTitle="To"
          formulatedOffersStatusTitle="Status"
          formulatedOffersNftTitleClass="formulated-offers-nft-title"
          formulatedOffersYourOffersTitleClass="formulated-offers-your-offers-title"
          formulatedOffersFromTitleClass="formulated-offers-from-title"
          formulatedOffersToTitleClass="formulated-offers-to-title"
          formulatedOffersStatusTitleClass="formulated-offers-status-title"
          formulatedOffersDateTitleClass="formulated-offers-date-title"
        />
        <div className="nft-list-formulated-offer-container">
          {nftListArray.map((_, index) => (
            <NftList
              key={index}
              formulatedOffersDisplaySourceType="formulated-offers-display-source-type"
              formulatedOffersFrom="you"
              formulatedOffersTo="Gr3goir3"
              formulatedOffersStatus="Pending"
              formulatedOffersStatusImage={
                <>
                  <div className={displayCurrentOffersStatus()}></div>
                </>
              }
              formulatedOffersNftContentClass="formulated-offers-nft-picture-and-title"
              formulatedOffersYourOffersPriceClass="formulated-offers-your-offers-price"
              formulatedOffersFromClass="formulated-offers-from"
              formulatedOffersToClass="formulated-offers-to"
              formulatedOffersStatusClass="formulated-offers-status"
              formulatedOffersDateClass="formulated-offers-date"
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default FormulatedOffers;
