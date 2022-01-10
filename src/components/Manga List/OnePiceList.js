import React, { useState, useEffect, useContext } from "react";
import ListChapters from "../ListChapters";
import { DataContext } from "../useContext/GeneralContext";
import { Link } from "react-router-dom";
import "../../styles/styles.css";
import PleaseRefresh from "../Animations/PleaseRefresh.js";
import AnimationLottie from "../Animations/AnimationLottie.js";

// // const ip = "http://localhost:3001/"

const ip = "https://manga-webscrape.herokuapp.com/"

// 

// const mangaURL = ip + "one-piece-ch/";
const mangaURL = "https://manga-scrapper-java.herokuapp.com/manga/links/";


function OnePiceList({ episodes_ONE, original_One }) {
  const {
    setEpisodesList,
    setLoading,
    setCurrentCH,
    setTitle,
    setEpListOrginal,
  } = useContext(DataContext);

  const { setLinkCH } = useContext(DataContext);

  return (
    <div id="one-piece-list" className="myListChapters one">
      <ul>
        <img src="https://i.ibb.co/ZVwjF7Y/AAAABd-PChf-CEFi-D521b1-XCo-Ffv-Qlx9-F1no-t-UHM5-SFJ0s9b-Fxk1-Gy-Ikje-ZSM60x-Cfbc-NTPr0-Te-Sn-SWt44u.png" alt="one piece logo"></img>
        <ListChapters
          chapterCH={episodes_ONE.map((item, index) => {
            return (
              <li
                onClick={() => {
              
                  setEpListOrginal(original_One);
                  setEpisodesList(episodes_ONE);
                  setCurrentCH(original_One[index]);
                  setTitle(item);
                  setLinkCH(mangaURL);
                  setLoading(false);
                }}
                key={index}
              >
                <Link
                  to={{
                    pathname: "/One-piece",
                  }}
                >
                  {item}
                </Link>
              </li>
            );
          })}
        />
      </ul>
    </div>
  );
}

export default OnePiceList;
