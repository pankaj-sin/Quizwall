
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PausePresentationIcon from '@mui/icons-material/PausePresentation';
import "./Timer.css";
import React, { useEffect, useState ,forwardRef,useImperativeHandle} from "react";


function Timer({ next, indexValue, length,second}) {
  const [seconds, setTime] = useState(30);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(true);


  // console.log(second)
  // const intervalRef = useRef(null);

  // var timer,timer1;
  // useEffect(() => {
  //   timer1++;
  //   timer = setInterval(() => {
      // if (seconds > 0) {
      //   setSeconds(seconds - 1);
      // } else if (seconds === 0 && length - 1 > indexValue) {
        // next();
        // setSeconds(30);
  //     } else clearInterval(timer);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // });


  // function pauseHandler() {
  //   setIsRunning(false);
  //   clearInterval(intervalRef.current)
  // }
  // function playHandler() {
  //   setIsRunning(true);
  //   intervalRef.current = setInterval(()=>{
  //     setSeconds(prevSeconds => prevSeconds -1
  //     );
  //   },1000)
  // }
//   useImperativeHandle(ref, ()=>{
// return setTime();
//   },[])



  useEffect(() => {
    let interval;
    
    if (isRunning) {
    
      interval = setInterval(() => {
          setTime((prevTime) => {
            if(prevTime>0)
            return prevTime-1
            else if(prevTime === 0 && length - 1 > indexValue){
            setTime(30)
            next()
            }
          });
      }, 1000);
      if(second){
        setTime(30)
      }
      
    }
   
    

    return () => clearInterval(interval);
  }, [isRunning,next]);

  const playHandler = () => {
    setIsRunning(true);
  };

  const pauseHandler = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  return (
    <div >
      {/* <div className="pau_icon" >
        
       {!isRunning  ? <PlayArrowIcon onClick={playHandler} /> :<PausePresentationIcon onClick={pauseHandler} /> }
      
      </div> */}
      

      <div className="timer">
        {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}
      </div>
    </div>
  );
}
export default Timer;
