import React,{useContext} from 'react'
import { DataContext } from "../useContext/GeneralContext";

export default  function SlideShow() {

    const {imageList}= useContext (DataContext)

if(imageList.length>5){
  return (
    <div className="three">

   {  imageList.map((item,index) => {
            return (
              <div key={index}>
                <img key={index} src={item} alt={index} />
              </div>
            );
          })
          
          
          }
        </div>
  )

}else{
  return (
    <div className="three">



              <div >
                <img key='{index}' src='https://img-16.ccm2.net/_SqzzXVDSG50FWb_UBrCl3XwV78=/440x/1685e17045e747a899925aa16189c7c6/ccm-encyclopedia/99776312_s.jpg' alt='{index}' />
              </div>
    
          
          
          
   
        </div>
  )

}
    
}




