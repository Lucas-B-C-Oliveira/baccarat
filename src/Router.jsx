import { Route, Routes } from "react-router-dom";
import Control from "./pages/Control";
import Game from "./pages/Game";


export function Router() {

  return (
    <Routes>
      <Route path="/" element={<Game />} />
      <Route path="/control" element={<Control />} />
    </Routes>
  )
}