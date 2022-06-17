/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
const dadosEndereco = require('../fixtures/endereco.json')
var faker = require('faker');

context('Testes End-to-end - Fluxo de pedido', () => {

    before(() => {
        cy.visit('minha-conta/')
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha, { log: false })
        })
    });

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        cy.addProdutos('Aero Daily Fitness Tee', 'S', 'Yellow', 2)
        cy.get('.woocommerce-message').should('contain', ' × “Aero Daily Fitness Tee” foram adicionados no seu carrinho.')

        cy.get('#primary-menu > .menu-item-629 > a').click()

        cy.addProdutos('Aether Gym Pant', '33', 'Blue', 2)
        cy.get('.woocommerce-message').should('contain', ' × “Aether Gym Pant” foram adicionados no seu carrinho.')

        cy.get('.woocommerce-message > .button').click()
        cy.get('.checkout-button').click()

        cy.get('.woocommerce-terms-and-conditions-checkbox-text').click()
        cy.get('.woocommerce-checkout-payment').click()
        cy.get('#place_order').click()

        cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    });
})