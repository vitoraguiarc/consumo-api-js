'use strict'

import {openModal, closeModal} from './modal.js'
import {readCustomers, createClient, deleteClient, updateClient} from './cliente.js'

const createRow = ({nome, email, celular, cidade, id}) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${nome}</td>
        <td>${email}</td>
        <td>${celular}</td>
        <td>${cidade}</td>
        <td>
            <button type="button" class="button green" onClick="editClient(${id})">editar</button>
            <button type="button" class="button red" onClick="delClient(${id})">excluir</button>
        </td>
    `
    return row
}

const fillForm = (client) => {
    document.getElementById('nome').value = client.nome
    document.getElementById('email').value = client.email
    document.getElementById('celular').value = client.celular
    document.getElementById('cidade').value = client.cidade
    document.getElementById('nome').dataset.id = client.id
}

globalThis.delClient = async (id) => {
    await deleteClient(id)
    updateTable
}

globalThis.editClient = async (id) => {
    //armazenar as informações do cliente selecionado
    const client = await readCustomers(id)

    //preencher o formulario com as informações
    fillForm(client)

    //abrir o modal
    openModal()
}



const updateTable = async () => {

    const clienteContainer = document.getElementById('clients-container')
    //Ler a API e armazenar o resultado em uma variavel
    const customers = await readCustomers()

    //Preencher a tabela com as informações
    const rows = customers.map(createRow)

    clienteContainer.replaceChildren(...rows)
    
}

const isEdit = () => document.getElementById('nome').hasAttribute('data-id')

const saveClient = async () => {
    // criar um json com as informações do cliente
    const client = {
        "id": "",
        "nome": document.getElementById('nome').value,
        "email": document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "cidade": document.getElementById('cidade').value
    }

    if (isEdit()) {
        client.id = document.getElementById('nome').dataset.id
        await updateClient(client)
    } else {
         createClient(client)
    }

    closeModal()

    updateTable()
}


// const actionCliente = async (event) => {
//     if (event.target.type == 'button') {
//         const [action, codigo] = event.target.id.split('-')
//         if (action == 'editar') {
//             await updateClient(codigo)
//             openModal()
//         } else if (action== "excluir") {
//             await deleteClient(codigo)
//             updateTable()
//         }
            
//     }
// }

updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveClient)
