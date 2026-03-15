import { useState } from "react"
import { supabase } from "../lib/supabase"

export default function AddBook({reloadBooks}) {

const [title,setTitle] = useState("")
const [genre,setGenre] = useState("")
const [poster,setPoster] = useState("")
const [trailer,setTrailer] = useState("")
const [buyColor,setBuyColor] = useState("")
const [buyBW,setBuyBW] = useState("")
const [description,setDescription] = useState("")
const [cast,setCast] = useState("")

const handleSubmit = async (e) => {

e.preventDefault()

const { data, error } = await supabase
.from("books")
.insert([
{
title,
genre,
poster,
trailer,
buy_color: buyColor,
buy_bw: buyBW,
description,
cast
}
])

if(error){
alert("Error adding book")
console.log(error)
}
else{
alert("Book Added Successfully")

reloadBooks()

setTitle("")
setGenre("")
setPoster("")
setTrailer("")
setBuyColor("")
setBuyBW("")
setDescription("")
setCast("")
}

}

return (

<div style={{maxWidth:"600px",margin:"auto"}}>

<h2>Add New Book</h2>

<form onSubmit={handleSubmit}>

<input placeholder="Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
required
/>

<input placeholder="Genre"
value={genre}
onChange={(e)=>setGenre(e.target.value)}
/>

<input placeholder="Poster URL"
value={poster}
onChange={(e)=>setPoster(e.target.value)}
/>

<input placeholder="Trailer URL"
value={trailer}
onChange={(e)=>setTrailer(e.target.value)}
/>

<input placeholder="Buy Colour Link"
value={buyColor}
onChange={(e)=>setBuyColor(e.target.value)}
/>

<input placeholder="Buy B&W Link"
value={buyBW}
onChange={(e)=>setBuyBW(e.target.value)}
/>

<textarea
placeholder="Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>

<input placeholder="Cast"
value={cast}
onChange={(e)=>setCast(e.target.value)}
/>

<button type="submit">
Add Book
</button>

</form>

</div>

)

}