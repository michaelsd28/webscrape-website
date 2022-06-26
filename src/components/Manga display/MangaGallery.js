import React, { useState, useContext,useEffect } from "react";
import "../../styles/ImagesContainer.css";
import Button from "@material-ui/core/Button";
import { useLocation } from "react-router-dom";
import { DataContext } from "../useContext/Context";




function  MangaGallery() {  
  const {episodesList,currentCH,setCurrentCH,setTitle,title,loading, setLoading,imageList}= useContext (DataContext)

const [myTitle,setMyTitle] = useState(title)





  return (    <div className="copy-paste">
  <div id="all-images">
    <div className="one">
      <div className="dropdown show">
        <a
          className="btn btn-secondary dropdown-toggle"
          href="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Dropdown link
        </a>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <a className="dropdown-item" href="#">
            Action
          </a>
          <a className="dropdown-item" href="#">
            Another action
          </a>
          <a className="dropdown-item" href="#">
            Something else here
          </a>
        </div>
      </div>
    </div>
    <div className="two">
      <div className="nested">
        <div className="prev">
          {" "}
          <Button
            onClick={() => {

             
              episodesList.map((item, index) => {
                if (typeof episodesList[index + 1] !== "undefined") {
                  if (item === myTitle) {
                    
                    if (typeof episodesList[index + 1] === "undefined") {
                    } else {
                     setMyTitle(episodesList[index + 1]) 
                     setCurrentCH(episodesList[index + 1]);
                    }

                  //  setLoading(false);
                  }
                }
              });
            }}
            variant="contained"
            color="primary"
          >
            <span className="prev-button">
              {" "}
              <i className="fas fa-backward"></i>Prev{" "}
            </span>
          </Button>
        </div>
        <div className="text">
          <h4>{myTitle}</h4>
        </div>
        <div className="next">
          {" "}
          <Button
         onClick={() => {

             
          episodesList.map((item, index) => {
            if (typeof episodesList[index - 1] !== "undefined") {
              if (item === myTitle) {
               
            
           
                
                if (typeof episodesList[index - 1] === "undefined") {

                } else {

                //  setMyTitle(chaptersArray[index - 1]);
                
                //  setContext(chapterForRequest(chaptersArray[index + 1]))
               
                  // console.log(myTitle,'chaptersArray 4:33 pm');
        
                }

              //  setLoading(false);
              }
            }
          });
        }}
            variant="contained"
            color="secondary"
          >
            <span className="prev-button">
              {" "}
              Next <i className="fas fa-forward"></i>
            </span>
          </Button>
        </div>
      </div>
    </div>
    <div className="three">
      {imageList.map((item) => {

      
        return (
          <div>

            <h1>mmg</h1>

            <img src={item} />
            
          </div>
        );
      })}
    </div>
    <div className="four sketchy">
      <div className="nested">
        <div className="prev">
          {" "}
          <Button
            // onClick={() => {
            //   episodesCH.map((item, index) => {
            //     if (typeof episodesCH[index + 1] !== "undefined") {
            //       if (item === title) {
            //         if (typeof episodesCH[index + 1] === "undefined") {
            //         } else {
            //           setTitle(episodesCH[index + 1]);
            //           setState(chapterForRequest(episodesCH[index + 1]));
            //         }

            //         setLoading(false);
            //       }
            //     }
            //   });
            // }}
            variant="contained"
            color="primary"
          >
            <span className="prev-button">
              {" "}
              <i className="fas fa-backward"></i>Prev{" "}
            </span>
          </Button>
        </div>
        <div className="text">
        <h4>{myTitle}</h4>
        </div>
        <div className="next">
          {" "}
          <Button
            // onClick={() => {
            //   episodesCH.map((item, index) => {
            //     if (typeof episodesCH[index - 1] !== "undefined") {
            //       if (item === title) {
            //         setState(chapterForRequest(episodesCH[index - 1]));
            //         setTitle(episodesCH[index - 1]);
            //         setLoading(false);
            //       }
            //     }
            //   });
            // }}
            variant="contained"
            color="secondary"
          >
            <span className="prev-button">
              {" "}
              Next <i className="fas fa-forward"></i>
            </span>
          </Button>
        </div>
      </div>
    </div>
    <div id="link-go-home" className="five ">
      <a href="/" className="underline">
        {" "}
        Go home <i className="fas fa-undo-alt"></i>{" "}
      </a>
    </div>
    <div className="six">
      <a href="#header">
        TOP <i className="fas fa-sort-alpha-up"></i>
      </a>{" "}
    </div>
  </div>

</div>

);

}



export default MangaGallery;