import React, {useEffect,useState} from "react"
import { supabase } from "./lib/supabase"
import { FastAverageColor } from "fast-average-color"

export default function App(){

const [books,setBooks] = useState([])
const [activeBook,setActiveBook] = useState(null)
const [bg,setBg] = useState("#ffffff")

useEffect(()=>{
 loadBooks()
},[])

async function loadBooks(){

 const {data} = await supabase
 .from("books")
 .select("*")

 setBooks(data || [])
}

useEffect(()=>{

 if(!activeBook) return

 const fac = new FastAverageColor()

 const img = new Image()
 img.crossOrigin="anonymous"
 img.src=activeBook.poster

 img.onload=()=>{

 const color = fac.getColor(img)

 setBg(color.hex)

 document.documentElement.style.setProperty("--accent",color.hex)

 }

},[activeBook])

function scrollToBook(id){

 document.getElementById("book-"+id)
 .scrollIntoView({behavior:"smooth"})

 const book = books.find(b=>b.id===id)

 setActiveBook(book)
}

return(

<div style={{
background:bg,
minHeight:"100vh",
transition:"all 0.6s ease"
}}>

{/* HEADER */}

<div style={{
display:"flex",
gap:"20px",
padding:"20px",
overflowX:"auto"
}}>

{books.map(book=>(

<img
key={book.id}
src={book.logo}
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
alignItems:"center"
}}>

<img
src={book.poster}
style={{
width:"260px",
borderRadius:"10px"
}}
/>

<div>

<img
src={book.logo}
style={{
height:"80px",
marginBottom:"20px"
}}
/>

<p>{book.description}</p>

<br/>

<a href={book.color_link} target="_blank">
<button style={{marginRight:"10px"}}>Buy Colour</button>
</a>

<a href={book.bw_link} target="_blank">
<button>Buy B&W</button>
</a>

</div>

</div>

<br/><br/>

<iframe
width="700"
height="400"
src={book.trailer.replace("watch?v=","embed/")+"?autoplay=1"}
allow="autoplay"
></iframe>

</div>

))}

</div>

</div>

)

}
