const API_URL_GET_ALL = 'http://localhost:1335/api/logs/all'
const API_URL_POST = 'http://localhost:1335/api/logs/post'
const API_URL_DELETE = 'http://localhost:1335/api/logs/delete'
const API_URL_PUT  = 'http://localhost:1335/api/logs/modify'
export async function listLogs () {
  return await fetch(`${API_URL_GET_ALL}`).then(res => res.json())
}

export async function createLog (entry) {
  return fetch(API_URL_POST, {
    method: 'POST',
    body: JSON.stringify(entry),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
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
