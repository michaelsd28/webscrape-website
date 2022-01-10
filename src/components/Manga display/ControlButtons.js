import React, {useContext } from "react";
import { DataContext } from "../useContext/GeneralContext";
import Button from "@material-ui/core/Button";


function ControlButtons({className}){
    const {episodesList,setCurrentCH,setTitle,title,setLoading,epListOrginal}= useContext (DataContext)


    
return(

    <div className={className}>
      <div className="nested">
        <div className="prev">
          {" "}
          <Button
            onClick={() => {
              episodesList.map((item, index) => {
                if (typeof episodesList[index + 1] !== "undefined") {
                  if (item === title) {
                    if (typeof episodesList[index + 1] === "undefined") {
                    } else {
                      setTitle(episodesList[index + 1]);
                      setCurrentCH(epListOrginal[index + 1])
                      console.log(epListOrginal[index+1])
                    }

                    setLoading(false);
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
          <h4>{title}</h4>
        </div>
        <div className="next">
          {" "}
          <Button
            onClick={() => {
              episodesList.map((item, index) => {
                if (typeof episodesList[index - 1] !== "undefined") {
                  if (item === title) {
                    setTitle(episodesList[index - 1]);
                    setLoading(false);
                    setCurrentCH(epListOrginal[index - 1])
                    console.log(epListOrginal[index-1])
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




)

}







export default ControlButtons;