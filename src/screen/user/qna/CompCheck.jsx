import { isVisible } from "@testing-library/user-event/dist/utils";
import "./CheckComp.css";
import React, { useState } from "react"
function CompCheck({ getCheckBoxesData, options, setOptions }) {

  const [cdata, setCdata] = useState({ food: [] })
  const [checkData, setCheckData] = useState(getCheckBoxesData)
  

  function handleCheckboxChange(event) {
    const value = event.target.value;

    if (event.target.checked) {
      // Add the value to the array
      setOptions([...options, value]);
    } else {
      // Remove the value from the array
      setOptions(options.filter(item => item !== value));
    }
  }
  // props.getCheckBoxesData(cdata);

  return (
    <div className="check-boxes">
      

      {checkData?.length > 0 ? (checkData.map((item, index) => {
        return (

          <div key={index}>
            <input type="checkbox" id={item.option} name={item.option} value={item.option} onChange={handleCheckboxChange} />
            <label htmlFor={item.option}>{item.option}</label>
            <br />
          </div>



        )


      })) : ("No Category Available")}


      <br></br>

    </div>


  )
}
export default CompCheck