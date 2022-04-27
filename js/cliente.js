'use strict'

const url = 'https://testeleonid.herokuapp.com/clientes'

const readCustomers = async () => {
    const response = await fetch(url)
    return await response.json()
}

const createClient = async (client) => {
    const options = {
        'method': 'POST',
        'body': JSON.stringify(client),
        'headers': {
            'content-type': 'application/json'
        }
    }

    const response = await fetch(url, options)
    console.log (response.ok)
}

const deleteClient = async (codigo) => {
    const options = {
        'method': 'DELETE'
    }

    const response = await fetch(`${url}/${codigo}`, options)
    console.log (response.ok)

}



export {
    readCustomers, createClient, deleteClient
}