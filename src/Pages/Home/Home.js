import React, { useEffect, useState } from "react";
import "./Home.css";
import FeedSideNavLink from "../../Components/FeedSideNavLink/FeedSideNavLink";
import FavAthlete from "../../Components/FavAthlete/FavAthlete";
import FeedSuggestions from "../../Components/FeedSuggestions/FeedSuggestions";
import PostsFeed from "../../Components/PostsComponents/PostsFeed/PostsFeed";
import FeedEvent from "../../Components/EventComponent/FeedEvent";
import FeedLaunchpad from "../../Components/FeedLaunchpad/FeedLaunchpad";
import World from "../../Assets/Image/world.svg";
import Star from "../../Assets/Image/star.svg";
import Button from "../../Components/Button/Button";
import CreationPostPoll from "../../Components/CreationPostPoll/CreationPostPoll";
import Modal from "../../Components/Modal/Modal";
import FullPagePost from "../FullPagePost/FullPagePost";
import { v4 as uuidv4 } from "uuid";

function Home({ setData, data, setIsDropdownClicked, isLogged }) {
  const [isCreatePostButtonClicked, setIsCreatePostButtonClicked] =
    useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);

  const [isUserFan, setIsUserFan] = useState(false);
  const [lockPremiumContent, setLockPremiumContent] = useState(false);

  function handleDisplayPremiumContent(i) {
    if (isUserFan === false && data[i]?.postType === "Premium") {
      return true;
    } else if (isUserFan === true && data[i]?.postType === "Premium") {
      return false;
    } else if (data[i]?.postType === "Free") {
      return false;
    }
  }

  useEffect(() => {
    // simulate fake post data from backend
    const dataBackend = [
      {
        id: 0,
        name: "Romain Attanasio",
        postDate: 1,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        // postPicture:
        //   "https://www.leparisien.fr/resizer/CnZASpDcjMCWoWaK9Oo_DlYDs3s=/932x582/arc-anglerfish-eu-central-1-prod-leparisien.s3.amazonaws.com/public/3BWCVSJGBDZOGJB6IVH3ILNO7Y.jpg",
      },
      {
        id: 1,
        name: "Alexia Barrier",
        postDate: 2,
        postDateType: "d",
        postType: "Premium",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPoll: {
          firstChoice: "Barrier",
          secondChoice: "Attanasio",
          thirdChoice: "John",
          fourthChoice:"Arthur"
        },
          postPicture:
          "https://cdn-s-www.ledauphine.com/images/84EBA6B9-E83A-4FAA-8FC7-0768BD511F98/NW_raw/romain-attanasio-au-moment-de-boucler-le-vendee-globe-au-debut-de-l-annee-2017-1585955674.jpg",
      },
      {
        id: 2,
        name: "Romain Attanasio",
        postDate: 3,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPicture:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Romain_Attanasio_Vend%C3%A9e_Globe.jpg/280px-Romain_Attanasio_Vend%C3%A9e_Globe.jpg",
      },
      {
        id: 3,
        name: "Alexia Barrier",
        postDate: 2,
        postDateType: "d",
        postType: "Premium",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
          postPoll: {
            firstChoice: "Barrier",
            secondChoice: "Attanasio",
            thirdChoice: "",
            fourthChoice:""
          },
          postPicture: "",
      },
      {
        id: 4,
        name: "Romain Attanasio",
        postDate: 3,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPicture: "",
      },
      {
        id: 5,
        name: "Alexia Barrier",
        postDate: 2,
        postDateType: "d",
        postType: "Premium",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPicture: "",
      },
      {
        id: 6,
        name: "Romain Attanasio",
        postDate: 9,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPicture: "",
      },
      {
        id: 7,
        name: "Romain Attanasio",
        postDate: 3,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPicture: "",
      },
      {
        id: 8,
        name: "Romain Attanasio",
        postDate: 3,
        postDateType: "h",
        postType: "Free",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPicture: "",
      },
      {
        id: 9,
        name: "Romain Attanasio",
        postDate: 3,
        postDateType: "h",
        postType: "Premium",
        postDescription:
          "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
        postPicture: "",
      },
    ];
    for (let i = 0; i < dataBackend.length; i++) {
      dataBackend[i] = { ...dataBackend[i], ...{ isDropdownClicked: false } };
      // console.log(dataBackend[i].postType)
      // console.log(lockPremiumContent);
    }
    // Supprimer l'effet d'etat global pour que l'etat soit independant pour chaque element
    setData(dataBackend);
  }, [setData]);

  const handleDropdownPostFeedClick = (e) => {
    for (let i = 0; i < data.length; i++) {
      if (
        parseInt(e.currentTarget.id) === data[i].id &&
        data[i].isDropdownClicked === false
      ) {
        const newData = [...data];
        newData[i].isDropdownClicked = true;
        setData(newData);
        setIsDropdownClicked(true);
      }
    }
  };
  const handleCreatePostClick = () => {
    setIsCreatePostButtonClicked(true);
  };
  return (
    <>
      <section className="home-component">
        <div
          className="home-left-container"
          style={
            isLogged
              ? { height: "686px", maxHeight: "686px" }
              : { maxHeight: "646px" }
          }
        >
          <div
            className="home-navlink-create-post-wrap"
            style={isLogged ? { height: "138px" } : { height: "64px" }}
          >
            <div className="home-feedsidenavlink-wrap">
              <FeedSideNavLink
                href="/"
                svg={World}
                alt="world"
                title="Découverte"
                imgWidth="20px"
                gap="11px"
              />
              <FeedSideNavLink
                href="/"
                svg={Star}
                alt="world"
                title="Abonnements"
                imgWidth="22.83px"
                gap="8.59px"
              />
            </div>
            {isLogged && (
              <Button
                style={CreatePostButtonStyle.inlineStyle}
                customMediaQueries={CreatePostButtonStyle.customMediaQueries}
                text="Create a post"
                onClick={handleCreatePostClick}
              />
            )}
          </div>
          <FavAthlete />
          <FeedSuggestions />
        </div>
        <div className="home-center-container">
          <div>
            {data?.map((post, index) => {
              return (
                <PostsFeed
                  key={uuidv4()}
                  id={post.id}
                  // Backend data
                  postDate={post.postDate}
                  postDateType={post.postDateType}
                  postType={post.postType}
                  postDescription={post.postDescription}
                  postPoll={post.postPoll}
                  postPicture={post.postPicture}
                  // states and functions
                  isDropdownClicked={post.isDropdownClicked}
                  handleDropdownPostFeedClick={handleDropdownPostFeedClick}
                  setIsPostClicked={setIsPostClicked}
                  isPostClicked={isPostClicked}
                  lockPremiumContent={handleDisplayPremiumContent(index)}
                />
              );
            })}
          </div>
        </div>
        <div className="home-right-container">
          <FeedEvent />
          <FeedLaunchpad />
        </div>
      </section>
      {isCreatePostButtonClicked && (
        <Modal
          setState={setIsCreatePostButtonClicked}
          style={{ top: "24px", right: "20px" }}
        >
          <CreationPostPoll />
        </Modal>
      )}
      {isPostClicked && (
        <Modal
          setState={setIsPostClicked}
          style={{ top: "-24px", right: "2px" }}
          color="white"
        >
          {/* Faire passer les infos du post sur lequel on a cliqué (se référencer à la date affichée par ex) */}
          <FullPagePost />
        </Modal>
      )}
    </>
  );
}

export default Home;

const CreatePostButtonStyle = {
  inlineStyle: {
    backgroundColor: "#F6D463",
    border: "transparent",
    borderRadius: "10px",
    width: "284px",
    minHeight: "54px",
    fontFamily: "Britanica-Heavy",
    fontSize: "20px",
  },
  customMediaQueries:
    "@media (max-width: 950px) { .button-component { max-width: 250px; }}@media (max-width: 900px) {.button-component {max-width: 220px; } } @media (max-width: 860px){.button-component {max-width: 200px;}}@media (max-width: 840px){.button-component {max-width: 183px;}}",
};
