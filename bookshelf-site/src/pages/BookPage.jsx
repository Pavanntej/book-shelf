import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import { motion } from "framer-motion"

export default function BookPage(){

const { id } = useParams()
const navigate = useNavigate()

const [book,setBook] = useState(null)

async function loadBook(){

const { data } = await supabase
.from("books")
.select("*")
.eq("id",id)
.single()

setBook(data)

}

useEffect(()=>{
loadBook()
},[])

function getEmbedUrl(url){

if(!url) return ""

if(url.includes("shorts"))
return url.replace("shorts/","embed/")

if(url.includes("watch?v="))
return url.replace("watch?v=","embed/")

return url

}

if(!book){

return(

<div style={{
minHeight:"100vh",
background:"#111",
color:"#fff",
display:"flex",
alignItems:"center",
justifyContent:"center"
}}>
Loading book...
</div>

)

}

return(

<div style={{
minHeight:"100vh",
background:"#111",
color:"#fff"
}}>

{/* HERO BANNER */}

<div style={{
position:"relative",
height:"420px",
overflow:"hidden"
}}>

<img
src={book.poster}
style={{
width:"100%",
height:"100%",
objectFit:"cover",
filter:"blur(40px) brightness(40%)",
transform:"scale(1.2)"
}}
/>

<div style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
display:"flex",
alignItems:"center",
padding:"40px",
gap:"40px"
}}>

<img
src={book.poster}
style={{
width:"260px",
borderRadius:"12px",
boxShadow:"0 20px 60px rgba(0,0,0,0.8)"
}}
/>

<div>

<h1 style={{
color:"#d4af37",
fontSize:"40px"
}}>
{book.title}
</h1>

<p style={{color:"#aaa"}}>
{book.genre}
</p>

<p style={{
marginTop:"15px",
maxWidth:"500px"
}}>
{book.description}
</p>

<div style={{marginTop:"20px"}}>

<button
style={{
background:"#d4af37",
border:"none",
padding:"12px 18px",
borderRadius:"8px",
cursor:"pointer",
marginRight:"10px"
}}
onClick={()=>window.open(book.buy_color)}
>
Buy Colour
</button>

<button
style={{
background:"#d4af37",
border:"none",
padding:"12px 18px",
borderRadius:"8px",
cursor:"pointer"
}}
onClick={()=>window.open(book.buy_bw)}
>
Buy B&W
</button>

<button
style={{
marginLeft:"15px",
background:"#333",
border:"none",
padding:"12px 18px",
borderRadius:"8px",
color:"#fff",
cursor:"pointer"
}}
onClick={()=>navigate("/")}
>
Back
</button>

</div>

</div>

</div>

</div>

{/* TRAILER */}

{book.trailer && (

<div style={{
padding:"40px",
maxWidth:"900px",
margin:"auto"
}}>

<h2 style={{
color:"#d4af37",
marginBottom:"20px"
}}>
Trailer
</h2>

<motion.iframe
initial={{opacity:0,scale:0.9}}
animate={{opacity:1,scale:1}}
transition={{duration:0.5}}
width="100%"
height="500"
src={getEmbedUrl(book.trailer)}
frameBorder="0"
allowFullScreen
style={{
borderRadius:"10px"
}}
/>

</div>

)}

</div>

)

}