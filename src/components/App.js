import React from "react";
import { DataProvider } from "./useContext/GeneralContext";

import Header from "./Header";
import {AllManga} from "./Manga List/";

import Webscrape from "./Webscrape";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";



function App() {


  return (
    <React.StrictMode>
 
    <DataProvider>
      <Router>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={AllManga} />
            <Route exact path="/One-piece" component={Webscrape} />
          </Switch>
        </div>
      </Router>
    </DataProvider>
   
    </React.StrictMode>
  );
}

export default App;
