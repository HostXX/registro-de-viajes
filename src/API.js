const API_URL_GET_ALL = process.env.REACT_APP_API_URL_GET_ALL
const API_URL_POST =process.env.REACT_APP_API_URL_POST
const API_URL_DELETE =process.env.REACT_APP_API_URL_DELETE
const API_URL_PUT  = process.env.REACT_APP_API_URL_PUT
export async function listLogs () {
  return await fetch(`${API_URL_GET_ALL}`).then(res => res.json())
}

export async function createLog (entry) {
  const apikey = entry.apikey
  delete entry.apikey
  const response = await fetch(API_URL_POST, {
    method: 'POST',
    body: JSON.stringify(entry),
    headers: {
      'Content-Type': 'application/json',
      'API_KEY' : apikey
    }
  })

  const jsonObject = await response.json()
  if (response.ok) {
    // console.log(response.ok);
    return response
   
  }
  const error = new Error(jsonObject.message)
  // console.log(error);
  throw error
}




export async function deleteLog (entryId) {
  try {
    const response = await fetch(API_URL_DELETE, {
      method: 'DELETE',
      body: JSON.stringify({
        entryId
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    console.log(error)
  }
}

// modify in construccion

export async function updateLog ({
  entryId,
  title,
  comment,
  description,
  image,
  vicitedAt
}) {
  try {
    const response = await fetch(API_URL_PUT, {
      method: 'PUT',
      body: JSON.stringify({
        entryId,
        title,
        comment,
        description,
        image,
        vicitedAt
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response
  } catch (error) {
    console.log(error)
  }
}
