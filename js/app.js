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

globalThis.delClient = async (id) => {
    await deleteClient(id)
    updateTable
}

globalThis.editClient = async (id) => {
    //armazenar as informações do cliente selecionado
    const client = await readCustomers(id)

    console.log(client)

    //preencher o formulario com as informações
}


const updateTable = async () => {

    const clienteContainer = document.getElementById('clients-container')
    //Ler a API e armazenar o resultado em uma variavel
    const customers = await readCustomers()

    //Preencher a tabela com as informações
    const rows = customers.map(createRow)

    clienteContainer.replaceChildren(...rows)
    
}

const saveClient = async () => {
    // criar um json com as informações do cliente
    const client = {
        "id": "",
        "nome": document.getElementById('nome').value,
        "email": document.getElementById('email').value,
        "celular": document.getElementById('celular').value,
        "cidade": document.getElementById('cidade').value
    }

    // enviar o json para o servidor API
    await createClient(client)

    // fechar a modal
    closeModal()

    // atualizar a tabela
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
document.getElementById('clients-container').addEventListener('click', actionCliente)