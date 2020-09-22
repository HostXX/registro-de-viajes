const API_URL = 'http://localhost:1335/api/logs/all'
const API_URL_POST = 'http://localhost:1335/api/logs/post'
const API_URL_DELETE = 'http://localhost:1335/api/logs/delete'

export  async function listLogs() {
     const response = await fetch(`${API_URL}`).then((res) => res.json()) 
     return response
}

export  async function createLog(entry) {
    const response =  fetch(API_URL_POST, {
          method: 'POST',
          body: JSON.stringify(entry),
          headers:{
            'Content-Type': 'application/json'
          }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
     
   return response
}

// delete in construccion

export  async function deleteLog(entryId) {
     const response =  fetch(API_URL_DELETE, {
           method: 'Delete',
           body: JSON.stringify({
                entryId
           }),
           headers:{
             'Content-Type': 'application/json'
           }
         }).then(res => res.json())
         .catch(error => console.error('Error:', error))
      
    return response
 }