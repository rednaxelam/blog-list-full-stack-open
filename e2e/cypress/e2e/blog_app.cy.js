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

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })
  
      it('A blog can be created', function() {
        cy.contains('add new blog').click()
        cy.get('#title').type('example blog')
        cy.get('#author').type('example author')
        cy.get('#url').type('example url')
        cy.get('button[type="submit"]').click()

        cy.contains('example blog example author')
        cy.request('GET', 'http://localhost:3003/api/blogs')
          .then(response => {
            const savedblog = response.body[0]
            expect(savedblog.title).to.eql('example blog')
            expect(savedblog.author).to.eql('example author')
          })
      })
    })
  })
})