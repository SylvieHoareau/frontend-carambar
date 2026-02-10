describe('Page d\'accueil Carambar', () => {
  beforeEach(() => {
    // Le serveur tourne sur le port 3000
    cy.visit('http://localhost:3000');
  });

  it('devrait afficher le titre et charger les blagues', () => {
     // On attend que le loader disparaisse (role="status")
    cy.get('[role="status"]', { timeout: 10000}).should('not.exist');
    
    cy.contains(/Carambar & Co/i).should('be.visible');

    // On vérifie qu'au moins un composant de blague est chargé
    cy.get('details').first().should('be.visible');
  });

  it('devrait révéler la réponse au clic sur la première blague', () => {
    // 1. On trouve le premier bloc de blague
    // 2. On clique sur le texte "Afficher la réponse" (balise summary)
    cy.get('summary').first().click();

    // 3. On vérifie que le bloc <details> est maintenant ouvert
    cy.get('details').first().should('have.attr', 'open');
  });
});