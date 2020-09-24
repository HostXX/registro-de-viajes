import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import { listLogs } from './API'
import Nav from './compoments/Nav'
import MapComponent from './compoments/MapComponent'
import ProtectedRoute from './compoments/ProtectedRoute'
import AccountPage from './compoments/AccountPage'
import LoginPage from './compoments/LoginPage'


function App () {
  const [logEntries, setLogEntries] = useState([])
  const [isLogged, setIsLogged] = useState(true)
  const [addEntryLocation, setAddEntryLocation] = useState(null)
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: 18.5073011,
    longitude: -69.858715,
    zoom: 10
  })

  useEffect(() => {
// changue in prod (!)
    if (isLogged) {
      getEntries()
    } else {
      console.log('not logged');
      setLogEntries([])
      return
    }
  }, [isLogged])

  const getEntries = async () => {
    const logs = await listLogs()
    setLogEntries(logs)
  }

  const showAddMarkerPopUp = e => {
    const [longitude, latitude] = e.lngLat

    setAddEntryLocation({
      latitude,
      longitude
    })
  }
  return (
    <div className='App'>
      <Nav isLogged={isLogged} setIsLogged={setIsLogged} />
      <Route exact path='/'>
        <MapComponent
          viewport={viewport}
          getEntries={getEntries}
          setAddEntryLocation={setAddEntryLocation}
          showAddMarkerPopUp={showAddMarkerPopUp}
          setViewport={setViewport}
          logEntries={logEntries}
          addEntryLocation={addEntryLocation}
        />
      </Route>

      <Route exact path='/login'>
        <LoginPage isLogged={isLogged} setIsLogged={setIsLogged} />
      </Route>

      <ProtectedRoute
        exact
        path={'/account/'}
        prueva={'prueva billy'}
        isLogged={isLogged}
        logEntries={logEntries}
        component={AccountPage}
        setLogEntries={setLogEntries}
      />
    </div>
  )
}

export default App
