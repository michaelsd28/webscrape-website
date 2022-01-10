import React,{useContext} from "react";
import refresh_PNG from '../../images/refresh.png';
import { DataContext } from "../useContext/GeneralContext";


let fetchChaList = async () =>{

    let response = await fetch("https://manga-scrapper-java.herokuapp.com/manga/update-list");
    
    }
 

function Refreshe_Button() {


    const {
        loadingM,
        setLoadingM
      } = useContext(DataContext);
    return (
        <div className="align-refresh">
            <div className="refresh-manga-list">
          <p> <div 
            onClick={()=>{
               
              setLoadingM(true)
              fetchChaList()

              setTimeout(() => {
                window.location.reload();
              }, 4000);

            }}
          
          className="img-box"><img className="refresh-list-img" src={refresh_PNG} ></img></div> </p>
          </div>
        </div>
    )
}

export default Refreshe_Button
