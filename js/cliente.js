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
    console.log (console.ok)
}



export {
    readCustomers, createClient
}