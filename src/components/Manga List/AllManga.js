import React, { useState,useEffect,useContext } from "react";
import { OnePiceList, BokuNoHeroList, BorutoList } from "../Manga List";
import { DataContext } from "../useContext/GeneralContext";
import AnimationLottie from "../Animations/AnimationLottie.js";
import Refreshe_Button from "./Refreshe_Button";

const ip = "https://manga-webscrape.herokuapp.com/"

// const ip = "http://localhost:3001/"

// const url_BOKU = ip+"boku-no-hero/ch";
// const url_boruto = ip+ "boruto/ch";
// const url_onePiece = ip+"one/ch";

const url_BOKU = "https://manga-scrapper-java.herokuapp.com/manga/list/_BokuNoHeroList&=BokuNoHeroList";
const url_boruto = "https://manga-scrapper-java.herokuapp.com/manga/list/_BorutoList&=BorutoList";
const url_onePiece = "https://manga-scrapper-java.herokuapp.com/manga/list/_OnePieceList&=OnePieceList";




function AllManga(props) {
  const {
    loadingM,
    setLoadingM,
  } = useContext(DataContext);


  const [epBoku, set_epBoku] = useState([]);
  const [bokuNoHeroOriginal , setBokuNoHeroOriginal] = useState([])

  const [epBoruto, set_epBoruto] = useState([]);
  const [borutoREQ, setBorutoREQ] = useState([])


  const [epOnePiece, set_epOnePiece] = useState([]);
const[reqONE,setreqONE]=useState([])

  const [loadingEP,setLoadingEP] = useState(false);
  const [didMount, setDidMount] = useState(false);

  useEffect( () => {

    setDidMount(true);
/* boku no hero 1 #469527*/

   async function fetchChapters (){
     
  /* boku no hero 1 #469527*/
    const response_boku = await fetch(url_BOKU);
    const json_boku = await response_boku.json();
    set_epBoku(json_boku.chapterNames)
    setBokuNoHeroOriginal (json_boku.linkNames)
   
   


/* bokuto #FFA500 */
const response_boruto = await fetch(url_boruto);
const json_boruto = await response_boruto.json();
set_epBoruto(json_boruto.chapterNames)
setBorutoREQ(json_boruto.linkNames)


/* ONE piece      #DC143C */

const res_onePiece = await fetch(url_onePiece);
const json_ONE = await res_onePiece.json();
set_epOnePiece(json_ONE.chapterNames)
setreqONE(json_ONE.linkNames)


/* ONE piece      #DC143C */




    setLoadingM(false)


  } 


  fetchChapters()

    return () => setDidMount(false);

    
  }, []);

  if (!didMount) {
    return null;
  }





  if (loadingM) {

     return <AnimationLottie AnimationName={"mario-anim"} />
    
  } else {

  
async function fetchMoviesJSON() {
  const response = await fetch("https://manga-scrapper-java.herokuapp.com/manga/list/_BokuNoHeroList&=BokuNoHeroList");
  const movies = await response.json();
  

  const {chapterNames,linkNames} = movies


  return movies;


}

  
  
  fetchMoviesJSON() 



    
    return (
     <div>
       <Refreshe_Button/>
      <div id="all-manga-list" className="all-manga-list">
        <OnePiceList 
        episodes_ONE={epOnePiece}
        original_One={reqONE}
        
        />

        <BorutoList 
            episodes_boruto={epBoruto} 
            req_boruto ={borutoREQ} 
        />
        <BokuNoHeroList  
        episodes_BOKU={epBoku} 
        originalEP ={bokuNoHeroOriginal}   />
       
      </div>
      </div>
    );

  }
  
}

export default AllManga;
