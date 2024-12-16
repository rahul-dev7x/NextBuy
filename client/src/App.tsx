import { Outlet } from "react-router-dom"
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"


const App = () => {
  return (
    <>
    <div>
      <Header/>
      <main className="min-h-[80vh]">
        <Outlet/>
      </main>
      <Footer/>
    </div>
    </>
  )
}

export default App
