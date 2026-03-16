import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { motion } from "framer-motion"

export default function BookManager({ refresh }) {

const [books,setBooks] = useState([])
const [trailer,setTrailer] = useState(null)
const [editBook,setEditBook] = useState(null)

async function loadBooks(){

const { data,error } = await supabase
.from("books")
.select("*")
.order("created_at",{ascending:false})

if(!error) setBooks(data)

}

useEffect(()=>{
loadBooks()
},[refresh])

// ESC key closes modals
useEffect(()=>{

function closeModal(e){
if(e.key === "Escape"){
setTrailer(null)
setEditBook(null)
}
}

window.addEventListener("keydown",closeModal)

return ()=>window.removeEventListener("keydown",closeModal)

},[])

function getEmbedUrl(url){

if(!url) return ""

if(url.includes("shorts")){
return url.replace("shorts/","embed/")
}

if(url.includes("watch?v=")){
return url.replace("watch?v=","embed/")
}

return url

}

async function updateBook(){

await supabase
.from("books")
.update({
    genre: book.genre,
    poster: book.poster,
    trailer: book.trailer,
    description: book.description,
    color_buy_link: book.color_buy_link,
    bw_buy_link: book.bw_buy_link,
    cast: book.cast
})
.eq("id",editBook.id)

setEditBook(null)
loadBooks()

}

async function deleteBook(id){

await supabase
.from("books")
.delete()
.eq("id",id)

loadBooks()

}

const buttonStyle={
background:"#d4af37",
border:"none",
padding:"6px 10px",
borderRadius:"6px",
cursor:"pointer"
}

return (

<div style={{maxWidth:"1100px",margin:"auto"}}>

<h2>Your Books</h2>

<div style={{
display:"grid",
gridTemplateColumns:"repeat(auto-fill,220px)",
gap:"20px"
}}>

{books.map(book=>(

<motion.div
key={book.id}
whileHover={{scale:1.05}}
style={{
border:"1px solid #ddd",
borderRadius:"10px",
padding:"10px",
background:"#fff",
boxShadow:"0 5px 15px rgba(0,0,0,0.1)"
}}
>

<img
src={book.poster || "https://placehold.co/300x450"}
style={{
width:"100%",
height:"260px",
objectFit:"cover",
borderRadius:"6px"
}}
/>

<h3>{book.title}</h3>

<p style={{color:"#777"}}>{book.genre}</p>

<div style={{
display:"flex",
gap:"6px",
flexWrap:"wrap",
marginTop:"8px"
}}>

<button
style={buttonStyle}
onClick={()=>setTrailer(book.trailer)}
>
Trailer
</button>

<button
style={buttonStyle}
onClick={()=>setEditBook(book)}
>
Edit
</button>

<button
style={buttonStyle}
onClick={()=>deleteBook(book.id)}
>
Delete
</button>

</div>

</motion.div>

))}

</div>


{/* TRAILER MODAL */}

{trailer && (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
onClick={()=>setTrailer(null)}
style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.7)",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}
>

<motion.div
initial={{scale:0.8}}
animate={{scale:1}}
onClick={(e)=>e.stopPropagation()}
style={{
background:"#000",
padding:"20px",
borderRadius:"8px"
}}
>

<iframe
width="560"
height="315"
src={getEmbedUrl(trailer)}
frameBorder="0"
allowFullScreen
></iframe>

<br/>

<button
style={buttonStyle}
onClick={()=>setTrailer(null)}
>
Close
</button>

</motion.div>

</motion.div>

)}


{/* EDIT MODAL */}

{editBook && (

<motion.div
initial={{opacity:0}}
animate={{opacity:1}}
onClick={()=>setEditBook(null)}
style={{
position:"fixed",
top:0,
left:0,
right:0,
bottom:0,
background:"rgba(0,0,0,0.7)",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}
>

<motion.div
initial={{scale:0.8}}
animate={{scale:1}}
onClick={(e)=>e.stopPropagation()}
style={{
background:"#fff",
padding:"20px",
borderRadius:"8px",
width:"400px"
}}
>

<h3>Edit Book</h3>

<input
placeholder="Title"
value={editBook.title}
onChange={(e)=>setEditBook({...editBook,title:e.target.value})}
/>

<input
placeholder="Genre"
value={editBook.genre}
onChange={(e)=>setEditBook({...editBook,genre:e.target.value})}
/>

<input
placeholder="Poster URL"
value={editBook.poster}
onChange={(e)=>setEditBook({...editBook,poster:e.target.value})}
/>

<input
placeholder="Trailer URL"
value={editBook.trailer}
onChange={(e)=>setEditBook({...editBook,trailer:e.target.value})}
/>

<textarea
placeholder="Description"
value={editBook.description}
onChange={(e)=>setEditBook({...editBook,description:e.target.value})}
/>

<input
placeholder="Color Buying Link"
value={editBook.color_buy_link}
onChange={(e)=>setEditBook({...editBook,color_buy_link:e.target.value})}
/>

<input
placeholder="B&W Buying Link"
value={editBook.bw_buy_link}
onChange={(e)=>setEditBook({...editBook,bw_buy_link:e.target.value})}
/>

<input
placeholder="Cast"
value={editBook.cast}
onChange={(e)=>setEditBook({...editBook,cast:e.target.value})}
/>

<div style={{display:"flex",gap:"10px"}}>

<button style={buttonStyle} onClick={updateBook}>
Save
</button>

<button
style={buttonStyle}
onClick={()=>setEditBook(null)}
>
Cancel
</button>

</div>

</motion.div>

</motion.div>

)}

</div>

)

}
