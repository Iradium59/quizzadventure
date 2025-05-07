// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Configuration pour le CI/CD
beforeEach(() => {
  // Vérifier si nous sommes en mode CI/CD
  if (Cypress.env('SKIP_API_CALLS')) {
    // Intercepter toutes les requêtes API et retourner des fixtures
    cy.intercept('GET', '**/categories', { fixture: 'categories.json' }).as('getCategories');
    cy.intercept('GET', '**/questions/limit/*', { fixture: 'questions.json' }).as('getQuestions');
    cy.intercept('GET', '**/answers/question/*', { fixture: 'answers.json' }).as('getAnswers');
    cy.intercept('POST', '**/history', { statusCode: 201 }).as('postHistory');
    cy.intercept('GET', '**/history/ending/user/*', { fixture: 'history.json' }).as('getHistory');
  }
});

// Désactiver les erreurs de connexion au serveur en mode CI/CD
Cypress.on('uncaught:exception', (err) => {
  // Si nous sommes en mode CI/CD, ignorer les erreurs de connexion
  if (Cypress.env('SKIP_API_CALLS') && (err.message.includes('Failed to fetch') || err.message.includes('Network Error'))) {
    return false;
  }
  return true;
});