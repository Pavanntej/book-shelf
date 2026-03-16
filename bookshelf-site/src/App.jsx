import React, { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"

export default function App(){

const [books,setBooks] = useState([])

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

return(

<div style={{padding:"40px",fontFamily:"system-ui"}}>

<h1>My Books</h1>

{books.map(book=>(

<div key={book.id} style={{marginBottom:"60px"}}>

<img
src={book.poster}
style={{width:"200px",borderRadius:"8px"}}
/>

<h2>{book.title}</h2>

<p>{book.description}</p>

<a href={book.color_link} target="_blank" rel="noreferrer">
<button>Buy Colour</button>
</a>

<a href={book.bw_link} target="_blank" rel="noreferrer">
<button>Buy B&W</button>
</a>

<br/><br/>

<iframe
width="560"
height="315"
src={book.trailer}
title="Book Trailer"
allowFullScreen
></iframe>

</div>

))}

</div>

)

}
