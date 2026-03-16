import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";

export default function App() {

const [books,setBooks] = useState([])
const [editing,setEditing] = useState(null)

const [title,setTitle] = useState("")
const [genre,setGenre] = useState("")
const [poster,setPoster] = useState("")
const [logo,setLogo] = useState("")
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
 .order("id",{ascending:false})

 setBooks(data || [])
}

function openEdit(book){

 setEditing(book.id)

 setTitle(book.title || "")
 setGenre(book.genre || "")
 setPoster(book.poster || "")
 setLogo(book.logo || "")
 setTrailer(book.trailer || "")
 setDescription(book.description || "")
 setColorLink(book.color_link || "")
 setBwLink(book.bw_link || "")
 setCast(book.cast || "")
}

async function saveBook(){

 await supabase
 .from("books")
 .update({
  title,
  genre,
  poster,
  logo,
  trailer,
  description,
  color_link:colorLink,
  bw_link:bwLink,
  cast
 })
 .eq("id",editing)

 setEditing(null)

 fetchBooks()
}

async function deleteBook(id){

 await supabase
 .from("books")
 .delete()
 .eq("id",id)

 fetchBooks()
}

return (

<div style={{padding:"40px",fontFamily:"sans-serif"}}>

<h1>Books Admin</h1>

{books.map(book=>(
<div key={book.id} style={{border:"1px solid #ccc",padding:"20px",marginBottom:"20px"}}>

{editing===book.id? (

<div>

<input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)}/>
<br/><br/>

<input placeholder="Genre" value={genre} onChange={e=>setGenre(e.target.value)}/>
<br/><br/>

<input placeholder="Poster URL" value={poster} onChange={e=>setPoster(e.target.value)}/>
<br/><br/>

<input placeholder="Logo URL" value={logo} onChange={e=>setLogo(e.target.value)}/>
<br/><br/>

<input placeholder="Trailer URL" value={trailer} onChange={e=>setTrailer(e.target.value)}/>
<br/><br/>

<textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)}/>
<br/><br/>

<input placeholder="Color Book Link" value={colorLink} onChange={e=>setColorLink(e.target.value)}/>
<br/><br/>

<input placeholder="B&W Book Link" value={bwLink} onChange={e=>setBwLink(e.target.value)}/>
<br/><br/>

<input placeholder="Cast" value={cast} onChange={e=>setCast(e.target.value)}/>
<br/><br/>

<button onClick={saveBook}>Save</button>

</div>

):(

<div>

<h3>{book.title}</h3>

<button onClick={()=>openEdit(book)}>Edit</button>

<button onClick={()=>deleteBook(book.id)}>Delete</button>

</div>

)}

</div>
))}

</div>
)

}
