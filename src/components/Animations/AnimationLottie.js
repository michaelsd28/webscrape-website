import React,{useEffect,useRef,useState} from 'react'
import lottie from "lottie-web";

import  '../../styles/App.css'




function AnimationLottie ({AnimationName}){
  const [didMount, setDidMount] = useState(false);


const container = useRef(null);



    useEffect(() => {
   
    
        lottie.loadAnimation({  
            container: container.current, // required
            animationData: require(`../../images/${AnimationName}.json`), // required
            renderer: "svg", // required
            loop: true, // optional
            autoplay: true, // optional
            name: "Demo Animation", // optional
          });


    
      
      
    }, [])





    return(

        <div className='lottie-wrapper'>


        
        <div className="App-mario-anim">
        <div className="mario-anim" ref={container}>
          
        </div>
      </div>
      </div>

    )
   
}







export default AnimationLottie;