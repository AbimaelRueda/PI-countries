import './App.css';
import {Route} from "react-router-dom";
import Home from "./components/Home.jsx"
import Index from "./components/Index.jsx"
import Detail from "./components/Detail.jsx"
import Principal from "./components/Principal.jsx"
import Page from "./components/Page.jsx"

function App() {
  return (
    <div className="App">
      <div>
        <Route exact path = "/" component = {Index}/>
        <Route exact path = "/Pages" component={Principal}/>
        <Route exact path = "/Home" component = {Home}/>
        <Route exact path = "/Home/:id" component = {Detail}/>
        <Route exact path = "/Activity" component={Page}/>
      </div>
    </div>
  );
}

export default App;
