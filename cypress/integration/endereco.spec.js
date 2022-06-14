/// <reference types= "cypress" />
import EnderecoPage from '../support/page_objects/endereco.page'
const dadosEndereco = require('../fixtures/endereco.json')

describe('Funcionalidade Endereços - Faturamento e Entrega', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha)
        })
    });

    it('Deve fazer cadastro de faturamento com sucesso - Usando arquivo de dados', () => {
        EnderecoPage.editarEnderecoFaturamento(
            dadosEndereco.nome,
            dadosEndereco.sobrenome,
            dadosEndereco.empresa,
            dadosEndereco.pais,
            dadosEndereco.endereco,
            dadosEndereco.numero,
            dadosEndereco.cidade,
            dadosEndereco.estado,
            dadosEndereco.cep,
            dadosEndereco.telefone,
            dadosEndereco.email
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });
});