import { SearchField } from "./components/Search";
import { NavBar } from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen input_wrapper bg-[url('./assets/2.png')]">
      <NavBar />
      <div className="flex items-center justify-center min-h-[90vh] w-full">
        <SearchField />
      </div>
    </div>
  );
}

export default App;
