describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'mluukkai',
      password: 'salainen',
      name: 'Bob'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('#username')
    cy.get('#pwd')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#pwd').type('salainen')
      cy.contains('login').click()

      cy.contains('Bob logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkai')
      cy.get('#pwd').type('wrong')
      cy.contains('login').click()

      cy.contains('Login Unsuccessful').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})