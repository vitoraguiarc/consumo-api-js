'use strict'

import {openModal, closeModal} from './modal.js'
import {readCustomers, createClient} from './cliente.js'

const createRow = (client) => {
    const row = document.createElement('tr')
    row.innerHTML = `
        <td>${client.nome}</td>
        <td>${client.email}</td>
        <td>${client.celular}</td>
        <td>${client.cidade}</td>
        <td>
            <button type="button" class="button green">editar</button>
            <button type="button" class="button red">excluir</button>
        </td>
    `
    return row
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


updateTable()

// Eventos
document.getElementById('cadastrarCliente').addEventListener('click', openModal)
document.getElementById('salvar').addEventListener('click', saveClient)