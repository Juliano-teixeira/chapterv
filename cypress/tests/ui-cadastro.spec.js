/// <reference types="cypress" />

describe('Cadastro', () => {
  it('Cadastro com sucesso', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://api.realworld.io/api/users'
    }, {
      statusCode: 200,
      fixture: 'payload.cadastro'
    }).as('postUsers')

    cy.visit('register')
    cy.get('input[placeholder=Username]')
      .type('chapterjct')
    cy.get('input[placeholder=Email]')
      .type('jct@gmail.com')
    cy.get('input[placeholder=Password]')
      .type('1236mudar')
      .get('button.btn-primary')
      .click()
    cy.get('div .article-preview')
      .eq(1)
      .contains('No articles are here... yet.')
  })

  it('Usuário já existente', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://api.realworld.io/api/users'
    }, {
      statusCode: 422,
      fixture: 'payload.user-existente.json'
    }).as('postUsers')

    cy.visit('register')
    cy.get('input[placeholder=Username]')
      .type('chapterjct')
    cy.get('input[placeholder=Email]')
      .type('jct@gmail.com')
    cy.get('input[placeholder=Password]')
      .type('1236mudar')
      .get('button.btn-primary')
      .click()
    cy.contains('username has already been taken')
      .should('be.visible')
  })

  it('Submeter cadastro sem informar os dados obrigatórios', () => {
    cy.intercept({
      method: 'POST',
      url: 'https://api.realworld.io/api/users'
    }, {
      statusCode: 422,
      fixture: 'payload.sem-dados-obrigatorios'
    }).as('postUsers')

    cy.visit('register')
    cy.get('input[placeholder=Username]')
      .type('chapterjct')
    cy.get('input[placeholder=Email]')
      .type('jct@gmail.com')
    cy.get('input[placeholder=Password]')
      .type('1236mudar')
      .get('button.btn-primary')
      .click()
    cy.contains('email can\'t be blank').should('be.visible')
  })
})
