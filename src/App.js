import { Routes, Route } from "react-router-dom";
import IndexLayout from "./layout/IndexLayout";
import IndexPage from "./pages/IndexPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MoviesPage from "./pages/MoviesPage";
import TicketSelect from "./pages/TicketSelect";
import SelectSeat from "./components/SelectSeat";
import MovieByCategory from "./pages/MovieByCategory";


function App() {
  return (
      <Routes>
        <Route path="/" element={<IndexLayout />}>
          <Route index element={<IndexPage />} />
          <Route path="/movies/:id" element={<MoviesPage />} />
          <Route path="/ticket/:id" element={<TicketSelect />} />
          <Route path="/movies" element={<MovieByCategory />} />
        </Route>
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="seat" element={<SelectSeat />} />
      </Routes>
  );
}

export default App;
