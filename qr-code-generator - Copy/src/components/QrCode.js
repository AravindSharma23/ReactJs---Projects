import React, { useState } from 'react'
import SampleImage from '../assets/Doctor6.avif'
import SampleQRCode from '../assets/SampleQRCode.jpg';
export default function QrCode() {
    const [img,setImg] = useState("");
    const [loading,setLoading] = useState(false);
    const [qrData,setQrData] = useState("https://www.google.com/");
    const [qrSize,setQrSize] = useState(150);
    const generateQRCode = async ()=>{
        
          setLoading(true);
        try{
           const url = `https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrData)}`;
           setImg(url);

        }catch(err){
          console.log("Error is ",err);
        }finally{
            setLoading(false);
        }
    }
    const downloadQRCode = () =>{
        fetch(img)
        .then((response) => response.blob())
        .then((blob)=>{
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "QRCode.png";
            link.click();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch((err)=>{
            console.log("Error when downloading QRCode",err)
        })
    }
  return (
    <div className='app-container flex flex-col justify-center items-center w-screen h-screen' >
        <h1 className='text-cyan-500 text-2xl font-medium mb-2'>QR Code Generator</h1>
        {loading && <p>Please wait...</p>}

       { img &&<img src={img} alt="SampleImage" className='mb-2' width={150} height={150} /> }
       <div className='flex flex-col '>
        <label htmlFor="dataInput" className='input-label text-cyan-500 font-medium mb-2'>Data for QR Code</label>
        <input type="text" value={qrData} className='border-2 border-cyan-500 rounded-md p-2 w-96 focus:outline-cyan-600 mb-2' id="dataInput" placeholder='Enter data for QR Code ' onChange={(e)=>setQrData(e.target.value)}/>
        <label htmlFor="sizeInput" className='input-label text-cyan-500 font-medium mb-2'>Image size(e.g , 150):</label>
        <input type="text" id="sizeInput" value={qrSize} className='border-2 border-cyan-500 rounded-md p-2 w-96 focus:outline-cyan-600 mb-2' placeholder='Enter size of image' onChange={(e)=>setQrSize(e.target.value)}/>
        <div className='flex justify-between mt-2'>
        <button className={`border-2 rounded-md border-cyan-500 bg-cyan-700 hover:bg-cyan-600 p-2 text-white ${loading ? 'pointer-events-none opacity-50': ''}`} disabled={loading} onClick={generateQRCode}>Generate QR Code</button>
        <button className='border-2 rounded-md border-green-500 bg-green-700 hover:bg-green-600 p-2 text-white' onClick={downloadQRCode}>Download QR Code</button>
        </div>
        </div> 
    </div>
  )
}


