/* eslint-disable no-undef */

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset');
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('carluntux');
      cy.get('input:last').type('1234');
      cy.get('#loginButton').click();
      cy.contains('carluntux is logged');
    });

    it('fails with wrong credentials', function () {
      cy.get('input:first').type('test');
      cy.get('input:last').type('test');
      cy.get('#loginButton').click();
      cy.contains('Wrong credentials');
    });
  });
});

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset');
    cy.visit('http://localhost:3000');

    cy.get('input:first').type('carluntux');
    cy.get('input:last').type('1234');
    cy.get('#loginButton').click();
    cy.contains('carluntux is logged');
  });

  describe('Blog tests', function () {
    it('Create new blog', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('test');
      cy.get('#author').type('test');
      cy.get('#url').type('test.com');
      cy.get('#likes').type('10');
      cy.get('#blogFormCreate').click();
      cy.contains('test test');
    });

    it('Like blog', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('test');
      cy.get('#author').type('test');
      cy.get('#url').type('test.com');
      cy.get('#likes').type('10');
      cy.get('#blogFormCreate').click();
      cy.contains('test test');

      cy.contains('view').click();
      cy.contains('Like').click();
      cy.contains('11');
    });
  });
});

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/test/reset');
    cy.request('POST', 'http://localhost:3001/api/test/poblate');
    cy.visit('http://localhost:3000');

    cy.get('input:first').type('carluntux');
    cy.get('input:last').type('1234');
    cy.get('#loginButton').click();
    cy.contains('carluntux is logged');
  });

  describe('Test likes', function () {
    it('Test likes', function () {
      cy.wait(500);
      cy.get('.likes').then((likes) => {
        let isSort = true;
        let previus;
        for (let i = 0; i < likes.length; i++) {
          if (previus) {
            if (previus.innerHTML < likes[i].innerHTML) {
              isSort = false;
            }
          }
          previus = likes[i];
        }
        expect(isSort).to.equal(true);
      });
    });
  });
});
