/// <reference types="cypress" />

describe('Application de Quiz', () => {
  const baseUrl = 'http://localhost:3000';
  const testUsername = 'testUser' + Math.floor(Math.random() * 1000);

  beforeEach(() => {
    cy.intercept('GET', '**/categories', { fixture: 'categories.json' }).as('getCategories');
    cy.intercept('GET', '**/questions/limit/*', { fixture: 'questions.json' }).as('getQuestions');
    cy.intercept('GET', '**/answers/question/*', { fixture: 'answers.json' }).as('getAnswers');
    cy.intercept('POST', '**/history', { statusCode: 201 }).as('postHistory');
    cy.intercept('GET', '**/history/ending/user/*', { fixture: 'history.json' }).as('getHistory');
    
    cy.visit(baseUrl);
  });

  it('devrait afficher la page d\'accueil correctement', () => {
    cy.contains('h1', 'Quizz Adventure').should('be.visible');
    cy.get('input[placeholder="Enter your username"]').should('be.visible');
    cy.get('select').should('have.length', 2);
    cy.contains('button', 'Démarrer le quizz').should('be.visible');
    cy.contains('h3', 'Historique :').should('be.visible');
  });

  it('devrait afficher une erreur si le nom d\'utilisateur est vide', () => {
    cy.contains('button', 'Démarrer le quizz').click();
    cy.contains('Username is required').should('be.visible');
  });

  it('devrait charger les catégories correctement', () => {
    cy.wait('@getCategories');
    cy.get('select').eq(1).find('option').should('have.length.gt', 1);
  });

  it('devrait compléter un quiz et afficher la page de récapitulation', () => {
    cy.intercept('GET', '**/categories', { fixture: 'categories.json' }).as('getCategories');
    cy.intercept('GET', '**/questions/limit/5', { fixture: 'questions.json' }).as('getLimitedQuestions');
    cy.intercept('GET', '**/answers/question/*', { fixture: 'answers.json' }).as('getAnswers');
    cy.intercept('POST', '**/history', { statusCode: 201 }).as('postHistory');
    
    cy.get('input[placeholder="Enter your username"]').type(testUsername);    
    cy.contains('button', 'Démarrer le quizz').click();    
    
    cy.location('pathname').should('include', 'quiz');    
    cy.wait('@getLimitedQuestions');
    
    for (let i = 0; i < 5; i++) {
      cy.wait('@getAnswers');
      cy.get('button').first().click();
      cy.wait(1000);
    }  
    
    cy.wait('@postHistory', { timeout: 10000 });
    cy.location('pathname').should('include', 'recap');
    cy.contains('Recap').should('be.visible');
  });

  it('devrait retourner à l\'accueil depuis la page de récapitulation', () => {
    cy.intercept('GET', '**/categories', { fixture: 'categories.json' }).as('getCategories');
    cy.intercept('GET', '**/questions/limit/5', { fixture: 'questions.json' }).as('getLimitedQuestions');
    cy.intercept('GET', '**/answers/question/*', { fixture: 'answers.json' }).as('getAnswers');
    cy.intercept('POST', '**/history', { statusCode: 201 }).as('postHistory');
    
    cy.get('input[placeholder="Enter your username"]').type(testUsername);
    cy.contains('button', 'Démarrer le quizz').click();
    
    cy.location('pathname').should('include', 'quiz');
    cy.wait('@getLimitedQuestions');
    
    for (let i = 0; i < 5; i++) {
      cy.wait('@getAnswers');
      cy.get('button').first().click();
      cy.wait(1000);
    }
    
    cy.wait('@postHistory', { timeout: 10000 });
    cy.location('pathname').should('include', 'recap');
    
    cy.contains(/Retour|retour/).click();
    cy.location('pathname').should('not.include', 'recap');
    cy.contains('Quizz Adventure').should('be.visible');
  });

  it('devrait afficher l\'historique des quiz pour un utilisateur', () => {
    cy.intercept('GET', '**/history/ending/user/*', { fixture: 'history.json', delay: 300 }).as('getHistoryWithDelay');
    cy.get('input[placeholder="Enter your username"]').type(testUsername);
    cy.wait('@getHistoryWithDelay', { timeout: 10000 });
    cy.contains(/Historique|historique/).should('be.visible');
    cy.get('body').then($body => {
      if ($body.find('table').length > 0) {
        cy.get('th').should('have.length.at.least', 2);
        cy.get('th').contains(/Date|date/).should('exist');
        cy.get('th').contains(/Score|score/).should('exist');
      } else {
        cy.contains(/Aucun historique|pas d'historique|No history/).should('exist');
      }
    });
  });
  
  it('devrait conserver le nom d\'utilisateur dans le localStorage', () => {
    const persistentUsername = 'userPersistent' + Math.floor(Math.random() * 1000);
    cy.get('input[placeholder="Enter your username"]').clear().type(persistentUsername);
    cy.wait(1500);
    cy.reload();
    cy.get('input[placeholder="Enter your username"]').should('have.value', persistentUsername);
  });
});
