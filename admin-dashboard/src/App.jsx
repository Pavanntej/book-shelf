import React, { useEffect, useState } from "react"
import { supabase } from "./lib/supabase"

export default function App(){

const [books,setBooks] = useState([])
const [title,setTitle] = useState("")
const [genre,setGenre] = useState("")
const [poster,setPoster] = useState("")
const [trailer,setTrailer] = useState("")
const [description,setDescription] = useState("")
const [colorLink,setColorLink] = useState("")
const [bwLink,setBwLink] = useState("")
const [cast,setCast] = useState("")

useEffect(()=>{
 fetchBooks()
},[])

async function fetchBooks(){

 const {data} = await supabase
 .from("books")
 .select("*")

 setBooks(data || [])
}

async function addBook(){

 await supabase
 .from("books")
 .insert({
  title,
  genre,
  poster,
  trailer,
  description,
  color_link:colorLink,
  bw_link:bwLink,
  cast
 })

 fetchBooks()

}

return(

<div style={{padding:"40px",fontFamily:"system-ui"}}>

<h1>Admin Panel</h1>

<h2>Add Book</h2>

<input placeholder="Title" onChange={e=>setTitle(e.target.value)} />
<br/><br/>

<input placeholder="Genre" onChange={e=>setGenre(e.target.value)} />
<br/><br/>

<input placeholder="Poster URL" onChange={e=>setPoster(e.target.value)} />
<br/><br/>

<input placeholder="Trailer URL" onChange={e=>setTrailer(e.target.value)} />
<br/><br/>

<textarea placeholder="Description" onChange={e=>setDescription(e.target.value)} />
<br/><br/>

<input placeholder="Color Book Link" onChange={e=>setColorLink(e.target.value)} />
<br/><br/>

<input placeholder="B&W Book Link" onChange={e=>setBwLink(e.target.value)} />
<br/><br/>

<input placeholder="Cast" onChange={e=>setCast(e.target.value)} />
<br/><br/>

<button onClick={addBook}>Add Book</button>

<hr/>

<h2>Books</h2>

{books.map(book=>(
<div key={book.id}>

<h3>{book.title}</h3>

</div>
))}

</div>

)

}
