import { useEffect, useState } from "react"
import { supabase } from "../lib/supabase"
import {
Instagram,
Youtube,
MessageCircle,
Share2,
Twitter
} from "lucide-react"

export default function Bookshelf(){

const [books,setBooks] = useState([])

async function loadBooks(){

const { data } = await supabase
.from("books")
.select("*")
.order("created_at",{ascending:true})

setBooks(data || [])

}

useEffect(()=>{
loadBooks()
},[])

function getEmbedUrl(url){

if(!url) return ""

if(url.includes("shorts"))
return url.replace("shorts/","embed/")

if(url.includes("watch?v="))
return url.replace("watch?v=","embed/")

return url

}

function shareBook(book){

navigator.share?.({
title:book.title,
url:window.location.href
})

}

return(

<div
style={{
height:"100vh",
overflowY:"scroll",
scrollSnapType:"y mandatory",
fontFamily:"Inter, sans-serif",
background:"#000"
}}
>

{/* HEADER */}

<header
style={{
position:"fixed",
top:0,
left:0,
right:0,
display:"flex",
justifyContent:"space-between",
alignItems:"center",
padding:"18px 30px",
background:"rgba(0,0,0,0.6)",
backdropFilter:"blur(12px)",
zIndex:100
}}
>

<h2 style={{
color:"#d4af37",
fontFamily:"Playfair Display, serif",
letterSpacing:"1px"
}}>
Bookshelf
</h2>

<nav style={{
display:"flex",
gap:"20px",
flexWrap:"wrap"
}}>

{books.map(book=>(

<a
key={book.id}
href={`#book-${book.id}`}
style={{
color:"#ccc",
textDecoration:"none",
fontSize:"14px"
}}
>
{book.title}
</a>

))}

</nav>

<div style={{display:"flex",gap:"14px"}}>

<a href="https://instagram.com/pavanntej" target="_blank">
<Instagram size={20}/>
</a>

<a href="https://youtube.com/@pavanntej" target="_blank">
<Youtube size={20}/>
</a>

<a href="https://wa.me/919542648520" target="_blank">
<MessageCircle size={20}/>
</a>

</div>

</header>


{/* BOOK SECTIONS */}

{books.map(book=>(

<section
key={book.id}
id={`book-${book.id}`}
style={{
minHeight:"100vh",
scrollSnapAlign:"start",
position:"relative",
display:"flex",
alignItems:"center",
justifyContent:"center",
padding:"120px 20px",
color:"#fff"
}}
>

{/* CINEMATIC POSTER BACKGROUND */}

<div
style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
overflow:"hidden",
zIndex:-1
}}
>

<img
src={book.poster}
alt=""
style={{
position:"absolute",
width:"130%",
height:"130%",
objectFit:"cover",
top:"-15%",
left:"-15%",
filter:"blur(80px) saturate(1.3) brightness(0.9)",
opacity:0.85
}}
/>

{/* Seamless fade mask */}

<div
style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0,
background:`
radial-gradient(circle at 70% 50%, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.75) 60%, rgba(0,0,0,0.95) 100%),
linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.85) 100%)
`
}}
/>

</div>


{/* CONTENT */}

<div
style={{
position:"relative",
maxWidth:"1200px",
width:"100%",
display:"flex",
gap:"60px",
alignItems:"center",
justifyContent:"space-between",
flexWrap:"wrap"
}}
>

{/* LEFT SIDE */}

<div style={{flex:"1",minWidth:"280px"}}>

<h1 style={{
fontSize:"clamp(36px,6vw,60px)",
marginBottom:"20px",
fontFamily:"Playfair Display, serif",
background:"linear-gradient(90deg,#d4af37,#f5e29c)",
WebkitBackgroundClip:"text",
WebkitTextFillColor:"transparent"
}}>
{book.title}
</h1>

<p style={{
color:"#ddd",
lineHeight:"1.8",
fontSize:"17px"
}}>
{book.description}
</p>

{book.cast && (
<p style={{
marginTop:"12px",
color:"#bbb"
}}>
Cast: {book.cast}
</p>
)}

<div style={{
marginTop:"28px",
display:"flex",
gap:"14px",
flexWrap:"wrap"
}}>

<button
style={{
background:"#d4af37",
border:"none",
padding:"12px 22px",
borderRadius:"8px",
cursor:"pointer",
fontWeight:"600"
}}
onClick={()=>window.open(book.buy_color)}
>
Colour
</button>

<button
style={{
background:"#222",
border:"1px solid #444",
padding:"12px 22px",
borderRadius:"8px",
color:"#fff",
cursor:"pointer"
}}
onClick={()=>window.open(book.buy_bw)}
>
Black & White
</button>

</div>


{/* SHARE */}

<div style={{
marginTop:"20px",
display:"flex",
gap:"16px"
}}>

<button
style={{
background:"#333",
border:"none",
padding:"8px",
borderRadius:"6px",
cursor:"pointer",
color:"#fff"
}}
onClick={()=>shareBook(book)}
>
<Share2 size={16}/>
</button>

<a
href={`https://wa.me/?text=${encodeURIComponent(book.title+" "+window.location.href)}`}
target="_blank"
>
<MessageCircle size={18}/>
</a>

<a
href={`https://twitter.com/intent/tweet?text=${book.title}&url=${window.location.href}`}
target="_blank"
>
<Twitter size={18}/>
</a>

</div>

</div>


{/* RIGHT SIDE TRAILER */}

<div
style={{
flex:"1",
minWidth:"260px",
maxWidth:"380px",
display:"flex",
justifyContent:"center"
}}
>

{book.trailer ? (

<iframe
src={getEmbedUrl(book.trailer)+"?autoplay=1&mute=1"}
style={{
width:"100%",
aspectRatio:"9/16",
borderRadius:"16px",
boxShadow:"0 30px 80px rgba(0,0,0,0.8)"
}}
frameBorder="0"
allow="autoplay"
/>

) : (

<img
src={book.poster}
style={{
width:"100%",
borderRadius:"16px"
}}
/>

)}

</div>

</div>

</section>

))}

</div>

)

}