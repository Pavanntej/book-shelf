import React, { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"
import { FastAverageColor } from "fast-average-color"

export default function App(){

const [books,setBooks] = useState([])
const [activeBook,setActiveBook] = useState(null)
const [bg,setBg] = useState("#ffffff")

/* LOAD BOOKS */

useEffect(()=>{
 loadBooks()
},[])

async function loadBooks(){

 const {data,error} = await supabase
 .from("books")
 .select("*")

 if(!error){
 setBooks(data || [])
 }
}

/* CHANGE BACKGROUND BASED ON POSTER */

useEffect(()=>{

 if(!activeBook) return

 const fac = new FastAverageColor()

 const img = new Image()
 img.crossOrigin="anonymous"
 img.src=activeBook.poster

 img.onload=()=>{

 const color = fac.getColor(img)

 setBg(color.hex)

 document.documentElement.style.setProperty(
 "--accent",
 color.hex
 )

 }

},[activeBook])


/* SCROLL TO BOOK */

function scrollToBook(id){

 document
 .getElementById("book-"+id)
 .scrollIntoView({behavior:"smooth"})

 const book = books.find(b=>b.id===id)

 setActiveBook(book)
}


/* EXTRACT YOUTUBE ID */

function getYouTubeID(url){

 if(!url) return ""

 if(url.includes("shorts/")){
 return url.split("shorts/")[1].split("?")[0]
 }

 if(url.includes("watch?v=")){
 return url.split("watch?v=")[1].split("&")[0]
 }

 return url
}


/* UI */

return(

<div style={{
background:bg,
minHeight:"100vh",
transition:"all 0.6s ease",
fontFamily:"system-ui"
}}>

{/* HEADER */}

<div style={{
display:"flex",
gap:"20px",
padding:"20px",
overflowX:"auto",
borderBottom:"1px solid #eee"
}}>

{books.map(book=>(

<img
key={book.id}
src={book.logo}
alt={book.title}
style={{
height:"50px",
cursor:"pointer"
}}
onClick={()=>scrollToBook(book.id)}
/>

))}

</div>


{/* BOOKS */}

<div style={{padding:"40px"}}>

{books.map(book=>(

<div
id={"book-"+book.id}
key={book.id}
style={{
marginBottom:"120px"
}}
>

<div style={{
display:"flex",
gap:"40px",
alignItems:"center",
flexWrap:"wrap"
}}>

{/* POSTER */}

<img
src={book.poster}
alt={book.title}
style={{
width:"260px",
borderRadius:"10px",
boxShadow:"0 10px 30px rgba(0,0,0,0.2)"
}}
/>


{/* DETAILS */}

<div style={{maxWidth:"500px"}}>

<img
src={book.logo}
alt="logo"
style={{
height:"80px",
marginBottom:"20px"
}}
/>

<p style={{lineHeight:"1.6"}}>
{book.description}
</p>

<br/>

<a href={book.color_link} target="_blank" rel="noreferrer">
<button style={{
marginRight:"10px",
padding:"10px 16px",
borderRadius:"6px",
border:"none",
background:"var(--accent)",
color:"#fff",
cursor:"pointer"
}}>
Buy Colour
</button>
</a>

<a href={book.bw_link} target="_blank" rel="noreferrer">
<button style={{
padding:"10px 16px",
borderRadius:"6px",
border:"none",
background:"#333",
color:"#fff",
cursor:"pointer"
}}>
Buy B&W
</button>
</a>

</div>

</div>


<br/><br/>


{/* TRAILER (9:16) */}

<div style={{

width:"320px",
aspectRatio:"9/16",
borderRadius:"14px",
overflow:"hidden",
boxShadow:"0 10px 40px rgba(0,0,0,0.3)"

}}>

<iframe
src={`https://www.youtube.com/embed/${getYouTubeID(book.trailer)}?autoplay=1&mute=0`}
allow="autoplay; encrypted-media"
allowFullScreen
title="Book Trailer"
style={{
width:"100%",
height:"100%",
border:"none"
}}
></iframe>

</div>

</div>

))}

</div>

</div>

)

}
