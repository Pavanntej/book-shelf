import { useState } from "react"
import AddBook from "./pages/AddBook"
import BookManager from "./pages/BookManager"

function App(){

const [page,setPage] = useState("books")
const [refresh,setRefresh] = useState(false)

function reloadBooks(){
setRefresh(!refresh)
}

return(

<div className="dashboard">

<div className="sidebar">

<h2>Pavann CMS</h2>

<button onClick={()=>setPage("books")}>
Books
</button>

<button onClick={()=>setPage("add")}>
Add Book
</button>

</div>

<div className="content">

{page==="books" && <BookManager refresh={refresh}/>}

{page==="add" && <AddBook reloadBooks={reloadBooks}/>}

</div>

</div>

)

}

export default App
