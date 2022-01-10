import React, { useContext } from "react";
import "../../styles/ImagesContainer.css";
import { DataContext } from "../useContext/GeneralContext";

function DropDownCh({ className }) {
  const {
    episodesList,
    setCurrentCH,
    epListOrginal,
    setTitle,
    title,
    setLoading,
   
  } = useContext(DataContext);

  return (
  
    <div className={className}>

      <div id="Dropdown-id" className="box">
        <select
          name={title}
          value={title}
          onChange={(e) => {
            let value = e.target.value;
            setTitle(value);

            episodesList.map((item,index)=>{
                if (item===value){
                  setCurrentCH(epListOrginal[index]);

                  console.log(epListOrginal[index])
                }
           
            })
   


            setLoading(false);
            console.log(title)
          }}
        >
          {episodesList.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
      </div>
    </div>

  );
}

export default DropDownCh;
