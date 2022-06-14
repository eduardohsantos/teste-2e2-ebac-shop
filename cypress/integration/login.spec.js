/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
var faker = require('faker');

describe('Funcionalidade Login', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    beforeEach(() => {
        cy.visit('minha-conta')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve fazer login com sucesso - Usando fixture', () => {
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, {log:false})
            cy.get('.woocommerce-form > .button').click()

            cy.get('.page-title').should('contain', 'Minha conta')
        })
    });

    it('Deve completar o pré cadastro com sucesso usando faker', () => {
        let emailFaker2 = faker.internet.email()
        let nomeFaker2 = faker.name.firstName()
        let sobrenomeFaker2 = faker.name.lastName()

        cy.preCadastro(emailFaker2, 'senha!@#forte', nomeFaker2, sobrenomeFaker2)
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });
})