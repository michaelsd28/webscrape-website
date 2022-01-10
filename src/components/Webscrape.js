import React, { useContext } from "react";
import "../styles/ImagesContainer.css";
import { ControlButtons, DropDownCh, GoHome, GoTop } from "./Manga display";
import SlideShow from "./Manga display/SlideShow";
import AnimationLottie from "./Animations/AnimationLottie.js";
import { DataContext } from "./useContext/GeneralContext";

function Webscrape() {


  const { loading } = useContext(DataContext);

  if (!loading) {
    return <AnimationLottie AnimationName="naruto-anim" />;
  } else {
    return (
    
        <div id="all-images">
          <DropDownCh className={"one"} />
          <ControlButtons className={"two"} />

          <SlideShow />
          <ControlButtons className={"four sketchy"} />
          <GoHome />
          <GoTop />
        </div>
      
 
    );
  }
}

export default Webscrape;
