import React,{useState} from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import AddLogForm from './AddLogForm'

const MapComponent = ({viewport,showAddMarkerPopUp,setViewport,logEntries,addEntryLocation,setAddEntryLocation, getEntries }) => {
    const [showPopUp, setShowPopUp] = useState({})
    const [togleMap, setToggleMap] = useState(false)

    return (
      
            <div
        style={{ color: 'red', width: '100vw', height: '80vh ' }}
        className={'map-wrapper'}
      >
        <ReactMapGL
          {...viewport}
          onDblClick={showAddMarkerPopUp}
          onViewportChange={nextViewport => setViewport(nextViewport)}
          mapboxApiAccessToken={process.env.REACT_APP_TOKEN}
          mapStyle={togleMap ? `mapbox://styles/mapbox/streets-v11` : `mapbox://styles/mapbox/dark-v10`}
        >


          {logEntries.map(entry => {
            let size = 15
            return (
              <div key={entry._id}>
                <Marker

                  className='marker'
                  key={entry._id}
                  longitude={entry.longitude}
                  latitude={entry.latitude}
                  offsetLeft={-15}
                  offsetTop={-7}
                // captureDrag={false}
                // captureDoubleClick={false}

                > <div onClick={() => {

                  if (showPopUp[entry._id] === true) {
                    return
                  }
                  setShowPopUp({
                    ...showPopUp,
                    [entry._id]: true,
                  })
                }}> <svg

                  height={size}
                  viewBox='0 0 24 24'
                  style={{
                    cursor: 'pointer',
                    fill: '#d00',
                    stroke: 'none',
                    transform: `translate(50%,-100%)`
                  }}
                >
                      <path
                        d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
                      c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
                      C20.1,15.8,20.2,15.8,20.2,15.7z`}
                      />
                    </svg>
                    </div>

                  <div style={{
                    color: "#ff3333",
                    position: "absolute",
                    cursor: 'pointer',
                    transform: `translate(${-size / 2}px,${-size}px)`
                  }}>{entry.title}</div>

                </Marker>
                {
                  showPopUp[entry._id] ? <Popup
                    latitude={entry.latitude}
                    longitude={entry.longitude}
                    closeButton={true}
                    closeOnClick={false}
                    sortByDepth={true}
                    onClose={() => setShowPopUp({ ...showPopUp, [entry._id]: false })}
                    anchor="top" >
                    <div className={'pop-up'}>
                      <h3>{entry.title}</h3 >
                      <p>{entry.comment}</p>
                      <small> {"visited: "}{new Date(entry.visitedAt).toLocaleDateString()}</small>

                  { entry.image && <img width='200px' height='200px' src={entry.image} alt={entry.title} /> }

                      {/* creqate a handler for deletion */}
                      <button type='button'>Delete-Log</button>
                    </div>
                  </Popup> : null
                }
              </div>
            )


          })

          }

          {
            addEntryLocation ? <>
              <Marker
                className='marker'
                longitude={addEntryLocation.longitude}
                latitude={addEntryLocation.latitude}
                offsetLeft={-20}
                offsetTop={-10}
              // captureDrag={false}
              // captureDoubleClick={false}

              > <svg

                height={20}
                viewBox='0 0 24 24'
                style={{
                  cursor: 'pointer',
                  fill: '#ff3',
                  stroke: 'none',
                  transform: `translate(50%,-100%)`
                }}

              >
                  <path
                    d={`M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
    c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
    C20.1,15.8,20.2,15.8,20.2,15.7z`}
                  />
                </svg>
              </Marker>
              <Popup
                latitude={addEntryLocation.latitude}
                longitude={addEntryLocation.longitude}
                closeButton={true}
                closeOnClick={false}
                sortByDepth={true}
                onClose={() => setAddEntryLocation(null)}
                anchor="top" >
                <div className={'pop-up'}>
                  <h3>Add this new location to your log</h3>
                  <AddLogForm coordinates={addEntryLocation} onClose={() => {
                    setAddEntryLocation(null);
                    getEntries();
                  }} />
                </div>
              </Popup></> : null
          }

        </ReactMapGL>
        <label htmlFor="toggle-map">{`Change to: ${togleMap ? 'Dark' : 'Light'}`}</label> <input onChange={() => setToggleMap(!togleMap)} checked={togleMap} type="checkbox" name="toggle-map" id="toggle-map" />
      </div>
       
    );
}

export default MapComponent;
