import React, { useState } from 'react'
import data from "./AccordionData"
import {RiHeartFill,RiArrowDownSFill,RiArrowUpSFill} from "@remixicon/react";
export const Accordion = () => {
    //console.log("Data",data)
   const [selectedItem, setSelectedItem] =  useState(null);
   const [enableMultiSelect,setEnableMultiSelect] = useState(false);
   const [multipleSelected,setMultipleSelected] = useState([]);
    const handleOpen = (currentId)=>{
      const result = selectedItem === currentId ? setSelectedItem(null) : setSelectedItem(currentId)
      console.log("Handle Open");
       return result;
      //setSelectedItem(currentId);
    }
    const handleMultiSelect = (currentId)=>{
       console.log("Handle multi");
       let tempMultiSelected = [...multipleSelected];
       const findIndex = tempMultiSelected.indexOf(currentId);
      if(findIndex === -1){
        tempMultiSelected.push(currentId);
      }else{
        tempMultiSelected.splice(findIndex,1);
      }
      setMultipleSelected(tempMultiSelected);
    }
   console.log("multiple ",multipleSelected);
   console.log("enableMultiSelect ",enableMultiSelect);
   console.log("selectedItem",selectedItem);
  return (
    <>
       <button 
       onClick={()=>{setEnableMultiSelect(!enableMultiSelect)}}
       type="button" style={{marginLeft:"21rem"}} className=" m-2 rounded-md bg-slate-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600">Enable Multi Selection</button>
     <div style={{width:"500px"}}>
     {
        data && data.length>0 ? data.map(val =>
         <div className=''>
                <h3 
                onClick={ enableMultiSelect ?  ()=>{handleMultiSelect(val.id)} :  ()=>{handleOpen(val.id)}}
                className=' flex align-center bg-slate-400 border border-slate-200 py-2 px-3 text-justify'>{val.question}  
               { enableMultiSelect ? (multipleSelected.indexOf(val.id) !== -1 ? <RiArrowUpSFill size={30} color="#171717" className="cursor-pointer"/> : <RiArrowDownSFill size={30} color="#171717" className="my-icon cursor-pointer" /> ) : ((!enableMultiSelect && selectedItem === val.id) ? <RiArrowUpSFill size={30} color="#171717" className="cursor-pointer"/> : <RiArrowDownSFill size={30} color="#171717" className="my-icon cursor-pointer" /> ) }

                </h3> 

                { enableMultiSelect ? (multipleSelected && multipleSelected.indexOf(val.id) !== -1 && <span className='flex py-2 px-3 bg-slate-200 tranisition-all duration-300 text-justify'>{val.answer}</span>) : selectedItem === val.id && (<span className='flex py-2 px-3 bg-slate-200 tranisition-all duration-300 text-justify'>{val.answer}</span>)}
                {/* {( !enableMultiSelect && selectedItem === val.id) ?  (<span className='flex py-2 px-3 bg-slate-200 tranisition-all duration-300 text-justify'>{val.answer}</span>) : null} */}

                {/* {!multipleSelected && selectedItem === val.id && (<span className='flex py-2 px-3 bg-slate-200 tranisition-all duration-300 text-justify'>{val.answer}</span>)} */}
                {/* <span className='flex py-2 px-3 bg-slate-200 tranisition-all duration-300 text-justify'>{val.answer}</span> */}
               
                {/* <div className={`overflow-hidden transition-max-height duration-1000 ease-in-out `}>
                {selectedItem === val.id ? <span className='flex py-2 px-3 bg-slate-200 tranisition-all duration-300 text-justify'>{val.answer}</span> : null} 
               
                </div> */}
          </div>
         )
        : <div>No data found ....</div>
     }
     </div>
    </>
    
  )
}
