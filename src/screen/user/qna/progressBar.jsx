import "./progressBar.css";
import React, { useState } from "react"


function ProgressBar({colorpercent}) { 
  console.log(colorpercent)
   
  return (
    <div className="prog-bar-container">
<div className="progess-bar">
  <div className="progress-bar-fill" style={{ width: `${colorpercent}% `} } ></div>
</div>
    </div>
  )
}
export default ProgressBar