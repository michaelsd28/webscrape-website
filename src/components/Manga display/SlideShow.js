import React,{useContext} from 'react'
import { DataContext } from "../useContext/GeneralContext";
import b64toBlob from 'b64-to-blob';

export default  function SlideShow() {

    const {imageList,isBase64}= useContext (DataContext)

if(imageList.length>5){
  return (
    <div className="three">


{isBase64 &&  imageList.map((item,index) => {

  /// without data
  const newItem = item.replace("data:image/png;base64,", "");


  const blob = b64toBlob(newItem, 'image/png');
  const blobUrl = URL.createObjectURL(blob);



console.log(isBase64,"isBase64 6969")

            return (
              <div key={index}>
                <img key={index} src={blobUrl} alt={index} />
              </div>
            );
          })
          
          
          }

 

   {!isBase64&&  imageList.map((item,index) => {


console.log(isBase64,"isBase64 6969")

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




