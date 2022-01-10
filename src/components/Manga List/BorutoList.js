
import React, { useState, useEffect, useContext } from "react";
import ListChapters from "../ListChapters";
import { DataContext } from "../useContext/GeneralContext";
import { Link } from "react-router-dom";
import "../../styles/styles.css";



// const ip = "https://manga-webscrape.herokuapp.com/"

//  const mangaURL =  ip +'boruto-ch/';

const mangaURL =  "https://manga-scrapper-java.herokuapp.com/manga/links/";






function BorutoList({episodes_boruto,req_boruto}) {




    const {
      setEpisodesList,
      setLoading,
      setCurrentCH,
      setTitle,
      setEpListOrginal,
    } = useContext(DataContext);

  const {setLinkCH} =
  useContext(DataContext);



 
    return (

      <div id='boruto-list' className="myListChapters two">
        <ul>
        <img src='https://i.ibb.co/M9sLcng/Boruto-logo.png' alt="boruto-list"></img>
          <ListChapters
            chapterCH={episodes_boruto.map((item, index) => {
              return (
                <li
                  onClick={() => {
                     console.log(req_boruto + "req_boruto")
                    setEpListOrginal(req_boruto);
                    setEpisodesList(episodes_boruto);
                    setCurrentCH(req_boruto[index]);
                    setTitle(item);
                    setLinkCH(mangaURL);
                    setLoading(false)
                    
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

export default BorutoList;

