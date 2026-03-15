import { Routes, Route } from "react-router-dom"
import Bookshelf from "./pages/Bookshelf"
import BookPage from "./pages/BookPage"

function App(){

return(

<Routes>

<Route path="/" element={<Bookshelf/>}/>
<Route path="/book/:id" element={<BookPage/>}/>

</Routes>

)

}

export default App