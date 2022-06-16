/// <reference types="cypress" />
const perfil = require('../fixtures/perfil.json')
import EnderecoPage from '../support/page_objects/endereco.page'
const dadosEndereco = require('../fixtures/endereco.json')
var faker = require('faker');

context('Testes End-to-end - Fluxo de pedido', () => {

    before(() => {
        cy.visit('minha-conta/')
        cy.fixture('perfil').then(dados => {
            cy.login(dados.usuario, dados.senha, { log: false })
        })

        EnderecoPage.editarEnderecoFaturamento(
            dadosEndereco[1].nome,
            dadosEndereco[1].sobrenome,
            dadosEndereco[1].empresa,
            dadosEndereco[1].pais,
            dadosEndereco[1].endereco,
            dadosEndereco[1].numero,
            dadosEndereco[1].cidade,
            dadosEndereco[1].estado,
            dadosEndereco[1].cep,
            dadosEndereco[1].telefone,
            dadosEndereco[1].email
        )
        cy.get('.woocommerce-message').should('contain', 'Endereço alterado com sucesso.')
    });

    before(() => {
        cy.visit('minha-conta/')
        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        let nomeFaker = faker.name.firstName()
        let sobrenomeFaker = faker.name.lastName()
        cy.preCadastro(nomeFaker, sobrenomeFaker, 'aluno_ebac@teste.com', 'teste@teste.com')
        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
        cy.get('.woocommerce-MyAccount-navigation-link--customer-logout > a').click()
    });

    beforeEach(() => {
        cy.visit('produtos/')
    });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
        var quantidade = 2
        cy.addProdutos('Aero Daily Fitness Tee', 'S', 'Yellow', 2)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Aero Daily Fitness Tee” foram adicionados no seu carrinho.')

        cy.get('#primary-menu > .menu-item-629 > a').click()

        var quantidade = 2
        cy.addProdutos('Aether Gym Pant', '33', 'Brown', 2)
        cy.get('.woocommerce-message').should('contain', quantidade + ' × “Aether Gym Pant” foram adicionados no seu carrinho.')

        cy.get('.dropdown-toggle > .mini-cart-items').click()
        cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()

        cy.get('.showlogin').click()

        cy.fixture('perfil').then(dados => {
            cy.get('#username').type(dados.usuario)
            cy.get('#password').type(dados.senha, { log: false })
            cy.get('.woocommerce-button').click()

            cy.get('.woocommerce-terms-and-conditions-checkbox-text').click()
            cy.get('.woocommerce-checkout-payment').click()
            cy.get('#place_order').click()

            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        });
    })
})