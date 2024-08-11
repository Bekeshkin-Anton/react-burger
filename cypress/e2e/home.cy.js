describe('HomePage Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('должен отображать компонент BurgerIngredients', () => {
    cy.get('[data-cy="BurgerIngredients"]').should('be.visible');
  });

  it('должен отображать компонент BurgerConstructor', () => {
    cy.get('[data-cy="BurgerConstructor"]').should('be.visible');
  });
});
