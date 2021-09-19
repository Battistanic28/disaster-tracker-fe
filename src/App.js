import './Styles/App.css';
import { useEffect, useState } from "react";
import EonetAPI from "./API/EonetAPI";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import MyMap from "./MapComponents/MyMap.js";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import NavBar from "./NavBar";
import Loader from "./Loader";


function App() {
  const [eventsData, setEventsData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getEvents = async () => {
      setLoading(true)
      const events = await EonetAPI.getGlobalEvents('wildfires');
      setEventsData(events)
      setLoading(false)
    }
    getEvents()
  }, [])

  return (
    <>
      <BrowserRouter>
          <NavBar></NavBar>
          <main>
              <Switch>
                  <Route exact path="/">
                      {!loading ? <MyMap eventsData={eventsData} /> : <Loader />}
                  </Route>
                  <Route exact path="/login">
                    <Login></Login>
                  </Route>
                  <Route exact path="/signup">
                    <Signup></Signup>
                  </Route>
                  <Route exact path="/"></Route>
              </Switch>
          </main>
      </BrowserRouter>    
    </>
  );
}

export default App;