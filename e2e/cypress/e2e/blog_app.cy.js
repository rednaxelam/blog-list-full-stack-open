describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'mluukkai',
      password: 'salainen',
      name: 'Bob'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('')
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
        cy.request('GET', `${Cypress.env('BACKEND')}/blogs`)
          .then(response => {
            const savedblog = response.body[0]
            expect(savedblog.title).to.eql('example blog')
            expect(savedblog.author).to.eql('example author')
          })
      })

      describe('and a blog entry by the user exists', function() {
        beforeEach(function() {
          cy.createBlog({ title: 'example blog', author: 'example author', url: 'example url', likes: 3})
        })

        it('A blog can be liked', function () {
          cy.contains('example blog example author').contains('view').click()
          cy.contains('likes').find('button').click()

          cy.contains('likes 4')
          cy.request('GET', `${Cypress.env('BACKEND')}/blogs`)
          .then(response => {
            const savedblog = response.body[0]
            expect(savedblog.likes).to.eql(4)
          })
        })

        it('A blog can be deleted', function () {
          cy.contains('example blog example author').contains('view').click()
          cy.contains('remove').click()
          // cypress auto accepts confirmations, so don't need to do anything further to remove blog
          
          cy.contains('example blog example author').should('not.exist')
          cy.request('GET', `${Cypress.env('BACKEND')}/blogs`)
          .then(response => {
            expect(response.body.length).to.eql(0)
          })
        })
      })
    })
  })
})