import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/Dashboard/Dashboard";
import SureifyObjectMappings from "./components/SureifyObjectMappingComponent/SureifyObjectMappings/SureifyObjectMappings";
import ClientAPIs from "./components/ClientAPIs/ClientAPIs";
import { v4 as uuidv4 } from "uuid";

export default function App({ $, Popper }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard key={uuidv4()} />}></Route>
        <Route path="/clientapis" element={<ClientAPIs key={uuidv4()} />} />
        <Route path="/som" element={<SureifyObjectMappings key={uuidv4()} />} />
      </Routes>
    </BrowserRouter>
  );
}
