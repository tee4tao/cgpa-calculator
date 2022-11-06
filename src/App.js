import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Sidebar } from "./Sidebar";
import { Modal } from "./Modal";
import { FourPoints } from "./FourPoints";
import { FivePoints } from "./FivePoints";
import { FreeResources } from "./FreeResources";
function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route index element={<Home />} />
            <Route path="four-points" element={<FourPoints />} />
            <Route path="five-points" element={<FivePoints />} />
            <Route path="free-resources" element={<FreeResources />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
