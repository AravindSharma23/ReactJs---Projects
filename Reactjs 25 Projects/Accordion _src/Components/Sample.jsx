import React, { useState } from "react";
import data from "./AccordionData";
function Sample(){
console.log(data)
const [selectedItem,setSelectedItem] = useState(null)
const handleOpen = (currentId)=>{
    setSelectedItem(currentId);

    console.log(`selectedItem ${selectedItem} and currentId ${currentId}`);
 }
return(
    <div>{data.map((val)=>{
        return (
        <h3 onClick={()=>{handleOpen(val.id)}}
        key={val.id}>{val.question}</h3>
    )
     })}
     </div>
)

   
}
export default Sample