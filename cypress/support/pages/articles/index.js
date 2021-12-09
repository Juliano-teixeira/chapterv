const faker = require('faker')
const articleName = faker.datatype.string()
const elementos = require('./elements').ELEMENTS

class Articles {
  acessarFormulario () {
    cy.get('[href*=editor]').click()
  }

  preencherFormulario () {
    cy.get(elementos.linkNovoArtigo)
      .type(articleName)
    cy.get(elementos.typeDescriçãoArtigo)
      .type('Descrição do artigo')
    cy.get(elementos.corpoArtigo)
      .type('Descrição do artigo')
    cy.get(elementos.tag)
      .type('agilizei - bootcamp - cypress')
  }

  submeterFormulario () {
    cy.contains('button', 'Publish Article').click()
  }

  verificarSeArtigoFoiCriado () {
    cy.get('h1').should('have.text', articleName)
  }
} export default new Articles()
