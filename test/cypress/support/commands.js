// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Commande pour démarrer un quiz avec un nom d'utilisateur
Cypress.Commands.add('startQuiz', (username, category = null, limit = 5) => {
  cy.get('input[placeholder="Enter your username"]').clear().type(username);
  
  if (category) {
    cy.get('select').eq(1).select(category);
  }
  
  if (limit && limit !== 5) {
    cy.get('select').eq(0).select(String(limit));
  }
  
  cy.contains('button', 'Démarrer le quizz').click();
});

// Commande pour répondre à toutes les questions d'un quiz
Cypress.Commands.add('completeQuiz', (answerIndex = 0, questionCount = 5) => {
  // Attendre que les questions soient chargées
  cy.wait('@getQuestions');
  
  // Répondre à chaque question
  for (let i = 0; i < questionCount; i++) {
    cy.wait('@getAnswers');
    cy.get('button').eq(answerIndex).click();
    cy.wait(500); // Attendre un peu entre chaque question
  }
  
  // Attendre que l'historique soit enregistré
  cy.wait('@postHistory', { timeout: 10000 });
});

// Commande pour vérifier que nous sommes sur la page de récapitulation
Cypress.Commands.add('verifyRecapPage', () => {
  cy.location('pathname').should('include', 'recap');
  cy.contains(/Recap|Récapitulatif/).should('be.visible');
});

// Commande pour retourner à l'accueil depuis la page de récapitulation
Cypress.Commands.add('returnToHome', () => {
  cy.contains(/Retour|retour|Return|return|Home|home/).click();
  cy.location('pathname').should('not.include', 'recap');
  cy.contains('Quizz Adventure').should('be.visible');
});