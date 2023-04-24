import { validateToken } from "./validateToken.js"
const URL = 'http://localhost:8000/api'

let token = validateToken()

// TODO callback catch


export async function post(url, data){
    return await fetch(`${URL}/${url}`,{
      method: 'POST',
      body: data,
      headers: {
        'x-access-token': token
      },
    })
  }

export async function getAll(url){
  let data = "";
  await fetch(`${URL}/${url}`,{
    headers: {
      'x-access-token': token
    },
  })
  .then((response) => {
    data = response.json()
  })
  .catch((error) => alert('error:', error))

  return data
}

export async function getUserById(url,id){
  let response = '';
  await fetch(`${URL}/${url}?id=${id}`,{
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'x-access-token': token
    }
  })
    .then((res) => response = res.json())

  return response
    
}

export async function updateUser(url, user, id){

    return  await fetch(`${URL}/${url}?id=${id}`,{
         method: 'PUT',
         body:  user,
         headers: {
           'x-access-token': token
         },
       })
}

export async function findVehiclesByPatente(url,patente){
  let response
  
  await fetch(`${URL}/${url}?patente=${patente}`,{
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      'x-access-token': token
    }
  })
  .then((result) => {
    return response = result.json()
  }).catch((err) => {
    alert('error in find vehicle ', err)
  });

  return response
}

export async function updateVehicle(url, vehicle, id){
  // let response = '';

 return await fetch(`${URL}/${url}?id=${id}`,{
        
        method: 'PUT',
        body:  vehicle,
        headers: {
           'x-access-token': token
         },
  })
}

export async function deleted(url, id, callback){

  fetch(`${URL}/${url}?id=${id}`,{
    method: 'DELETE',
    headers: {
      'x-access-token': token
    },
  }).then(() => callback)
  .catch((err) => alert('error ' + err))


}