import './App.css'
import { useState } from 'react';
import axios from 'axios'
function App() {
  const [textToRead,setT]=useState("");
  const [text,setTT]=useState("Search Something...");
  const [price,setP]=useState("");
  const [images,setI]=useState([]);
  const [ss,setS]=useState(false);
  const [query,setQ]=useState("");
  const speakText = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };
  const handleReadAloud = (text) => {
    speakText(text);
  };
  return (
    <div style={{display:'flex',flexDirection:'column'}}>
    <h1 style={{textAlign:'center'}}>Search...</h1>
    <div style={{display:'flex',margin:'20px',justifyContent:'center'}}>
      <input placeholder='Search...' style={{width:'300px',margin:'10px',height:'50px', borderRadius:'19px',padding:'10px'}} onChange={(e)=>{setQ(e.target.value)}} />
      <button  style={{margin:'10px',borderRadius:'19px',padding:'10px',alignItems:'center'}} onClick={async(e)=>{
        e.preventDefault();setS(false);setTT("Loading...");
        try{
          console.log(query);
          if(query==""){ alert("Fill the field first");return;}
          const body={query};
          const data=await axios.post('http://localhost:5000/search',body);
          console.log(data);
          setS(true);
          if(data.data=='Not Found'){
            const ff="No shopping ads found for "+query;
            setT(ff);setP("");setI([]);
          }
          else{
          setP(data.data.price);setT(data.data.des);setI(data.data.img);
          const str=data.data.des+data.data.price.toString();
          handleReadAloud(str);}
        }catch(err){
          console.log(err);setP("");setI([]);setTT("Something went wrong....");setS(false);
          alert("something went wrong please try again later");
        }
      }}>Search</button>
    </div>{!ss?<h3 style={{textAlign:'center'}}>{text}</h3>:
    <div style={{display:'flex',justifyContent:'space-around', textAlign:'center',border:'solid',borderColor:'gray',borderRadius:'10px'}}>
    {images?.map((ele,index)=>{
      return <img key={index} style={{padding:'20px',margin:'10px'}} src={ele}
          width='150px' height='200px'
          alt="Base64 Image"/>
    })}
      <div style={{border:'solid', borderRadius:'10px',borderColor:'gray', margin:'10px'}}>
          <h3>{textToRead}</h3>
          <p>{price}</p>
      </div>
    </div>}
    </div>
  );
}

export default App
