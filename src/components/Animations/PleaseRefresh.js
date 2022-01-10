import React, { useState, useEffect, useRef } from "react";
import lottie from "lottie-web";








function PleaseRefresh({whichOne}) {
  const [didMount, setDidMount] = useState(false);

  const container = useRef(null);
  const [state, setState] = useState(whichOne)

  useEffect(() => {
    setState(whichOne)

   
    lottie.loadAnimation({
      container: container.current, // required
      animationData: require(`../../images/${state}.json`), // required
      renderer: "svg", // required
      loop: true, // optional
      autoplay: true, // optional
      name: "Demo Animation", // optional
    });

   
  
  }, []);
  



  return (
    <div onClick={()=>{window.location.reload(false)}} className="App-mario-anim">
      <h1 className="App-mario-anim please-Refresh">
          click to refresh the page <i className="fas fa-sync-alt"></i>
        </h1>
      <div className="mario-anim" ref={container}>
        
      </div>
    </div>
  );
}

export default PleaseRefresh;
