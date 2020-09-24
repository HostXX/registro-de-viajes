import React, { useState, useCallback } from 'react'
import { deleteLog } from '../API'

const AccountPage = ({ logEntries, setLogEntries }) => {
  const [entryToShow, setEntryToShow] = useState(null)
  const [ShowfullScreenImg, setShowFullScreenImg] = useState(false)
  const [fullScreenImg, setFullScreenImg] = useState(null)

  const handleShowEntryInfo = useCallback(
    entryInfo => setEntryToShow(entryInfo),
    []
  )

  const entries = logEntries => {
    const entriesToShow = logEntries.map(entry => (
      <li key={entry._id}>
        {entry.title}
        <button onClick={() => handleShowEntryInfo(entry)}>Info</button>{' '}
      </li>
    ))
    return entriesToShow
  }

  return (
    <div className={'account-page'}>
      <div className='locations'>
        <h4>Locations</h4>
        <ul>{logEntries ? entries(logEntries) : null}</ul>
      </div>
      <div className='account-info'>
        <div className='entry-info'>
          {entryToShow ? (
            <EntryDetail
              setFullScreenImg={setFullScreenImg}
              entry={entryToShow}
              setEntryToShow={setEntryToShow}
              logEntries={logEntries}
              setLogEntries={setLogEntries}
              setShowFullScreenImg={setShowFullScreenImg}
            />
          ) : (
            <h4>Select a location</h4>
          )}
        </div>
      </div>
      <div
        className={ShowfullScreenImg ? `full-screen-img-container` : `show`}
        onClick={() => setShowFullScreenImg(false)}
      >
        <img width='80%' height='80%' src={fullScreenImg} alt='prueba' />
      </div>
    </div>
  )
}

const EntryDetail = ({
  entry,
  setLogEntries,
  logEntries,
  setEntryToShow,
  setFullScreenImg,
  setShowFullScreenImg
}) => {
  return (
    <div className={'card-container'}>
      <h3 className={'location-title'}>{entry.title}</h3>
      <div className='location-image'>
        {entry.image ? (
          <img
            onClick={() => {
              setFullScreenImg(entry.image)
              setShowFullScreenImg(true)
            }}
            height='50%'
            width='50%'
            src={entry.image}
            alt={entry.title}
          />
        ) : <small>No image</small> }
      </div>
      <div className='info-container'>
        <div className='latirude'>
          <em>Latitude:</em>
          {entry.latitude}
        </div>
        <div className='longitude'>
          <em>Longitude:</em>
          {entry.longitude}
        </div>

        <div className='coments'>{entry.comment}</div>
      </div>

      <button
        onClick={() => {
          if (window.confirm(`Are you sure of deleting (${entry.title})`)) {
            deleteLog(entry._id)
              .then(() => {
                setEntryToShow(null)
                setLogEntries(logEntries.filter(item => item._id !== entry._id))
              })
              .catch(err => {
                setLogEntries(logEntries.filter(item => item._id !== entry._id))
                setEntryToShow(null)
                console.log(err)
              })
          }
          return
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default AccountPage
