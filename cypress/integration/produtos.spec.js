/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')

describe('Funcionalidade adicionando produtos - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */
  
    beforeEach(() => {
        cy.visit('produtos/')
    });

    afterEach(() => {
        cy.screenshot()
    });

    it('Deve adicionar produtos as carrinho - Usando comando customizado', () => {
        var quantidade = 4
        cy.addProdutos('Aero Daily Fitness Tee', 'XS', 'Yellow', 4)
        cy.get('.dropdown-toggle > .mini-cart-items').should('contain', quantidade)
        cy.get('.woocommerce-message').should('contain',  quantidade  + ' × “Aero Daily Fitness Tee” foram adicionados no seu carrinho.')
        
        cy.get('.dropdown-toggle > .mini-cart-items').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

        cy.get('.showlogin').click()
        
        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, {log: false})
            cy.get('.woocommerce-button').click()
            
            cy.get('.woocommerce-terms-and-conditions-checkbox-text').click()
            cy.get('.woocommerce-checkout-payment').click()
            cy.get('#place_order').click()

            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')

        });
    });
});