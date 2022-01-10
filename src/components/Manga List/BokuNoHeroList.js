import React, {  useContext } from "react";
import ListChapters from "../ListChapters";

import { DataContext } from "../useContext/GeneralContext";
import { Link } from "react-router-dom";
import "../../styles/styles.css";


// const ip = "http://localhost:3001/"
const ip = "https://manga-webscrape.herokuapp.com/"


// const boku_REQ = ip + "boku-no-hero-ch/";
const boku_REQ = "https://manga-scrapper-java.herokuapp.com/manga/links/";


function BokuNoHeroList({ episodes_BOKU, originalEP }) {


  const {
    setEpisodesList,
    setLoading,
    setCurrentCH,
    setTitle,
    setEpListOrginal,
  } = useContext(DataContext);



  const { setLinkCH } = useContext(DataContext);

  return (
    <div id="boku-no-hero-list" className="myListChapters three">
      <ul>
        <img src="https://i.ibb.co/518fKx5/My-Hero-Academia-logo.png"></img>
        <ListChapters
          chapterCH={episodes_BOKU.map((item, index) => {
            return (
              <li
                onClick={() => {

             
                  setEpListOrginal(originalEP);
                  setEpisodesList(episodes_BOKU);
                  setCurrentCH(originalEP[index]);
                  setTitle(item);

                 
                  setLinkCH(boku_REQ);
                  setLoading(false)



           

                  // setEpListOrginal(req_boruto);
                  // setEpisodesList(episodes_boruto);
                  // setCurrentCH(req_boruto[index]);
                  // setTitle(item);
                  // setLinkCH(mangaURL);
                  // setLoading(false)




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

export default BokuNoHeroList;
