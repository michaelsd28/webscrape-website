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
    setIsBase64,
    setLoading
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

            episodesList.map((item, index) => {
              if (item === value) {
                setCurrentCH(epListOrginal[index]);

                console.log(epListOrginal[index]);
              }
            });

            setLoading(false);
            console.log(title);
          }}
        >
          {episodesList.map((item, index) => {
            return <option key={index}>{item}</option>;
          })}
        </select>
      </div>
      <button
        className="btn btn-success"
        style={{
          margin: "70px 0 0 -60px",
          position: "absolute",
          minWidth: "150px"
        }}
        onClick={() => {

          setIsBase64(prevCheck => !prevCheck);
          setLoading(false);



        }}
      >
        Base 64
      </button>
    </div>
  );
}

export default DropDownCh;
