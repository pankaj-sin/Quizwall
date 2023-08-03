import "./RadioComp.css";
import React, { useState } from "react";
function RadioComp({getRadioData,options,setOptions}) {

    const [checkData, setCheckData] = useState(getRadioData)

    console.log("checkData-->", checkData);



    function choseChangeHandler(event) {
        console.log("event-->",event.target.value);
        setOptions(event.target.value)
        console.log("option-->",options);

    }
    //  console.log("props-->",props);
    //   props.getRadioData(checkData);


    return (
        <>
            <div className="input-radio">

                {checkData?.length > 0 ? (checkData.map((item, index) => {
                    return (

                        <div key={index}>
                            <input type="radio" id="2" name="mode" value={item.option} onChange={choseChangeHandler} />
                            <label htmlFor={item.option}>{item.option}</label>
                            <br />
                        </div>



                    )


                })) : ("No Category Available")}
            </div>
    
        </>
    );
}
export default RadioComp;
