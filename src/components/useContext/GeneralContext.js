import React, { createContext, useState, useEffect } from "react";

// const ip = "http://localhost:3001/"

const ip = "https://manga-webscrape.herokuapp.com/"

const urlChapters = ip + "one-piece-ch/";



export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [loadingM, setLoadingM] = useState(true)
  const [didMount, setDidMount] = useState(false);
  const [epListOrginal, setEpListOrginal] = useState([]);
  const [title, setTitle] = useState();
  const [episodesList, setEpisodesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentCH, setCurrentCH] = useState();
  const [imageList, setImageList] = useState([]);
  const [linkCH, setLinkCH] = useState(urlChapters);
  const [isBase64, setIsBase64] = useState(false);

  useEffect(() => {
    setDidMount(true);

    async function fetchTorrent() {
      if (typeof currentCH !== "undefined") {

        console.log(linkCH+currentCH,"link for images")
        const responseIMG = await fetch(`http://localhost:8080/manga/links/${currentCH}/isBase64&&=${isBase64}`);

     
        const jsonIMG = await responseIMG.json();
       

      
        setImageList(jsonIMG.mangaLinks);
        setLoading(true);
        window.scrollTo(0, 0);
      }

      console.log(currentCH, "<-Link Context One piece");
    }

    fetchTorrent();

    return () => setDidMount(false);
  }, [title, currentCH, isBase64]);

  if (!didMount) {
    return null;
  }

  return (
    <DataContext.Provider
      value={{
        episodesList,
        setEpisodesList,

        setCurrentCH,
        currentCH,

        imageList,
        setImageList,

        title,
        setTitle,

        loading,
        setLoading,

        linkCH,
        setLinkCH,

        setEpListOrginal,
        epListOrginal,


        loadingM, 
        setLoadingM,

        isBase64,
        setIsBase64
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
