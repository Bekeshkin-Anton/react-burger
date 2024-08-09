describe('HomePage Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('должен отображать заголовок "Соберите бургер"', () => {
    cy.contains('h1', 'Соберите бургер').should('be.visible');
  });

  it('должен отображать компонент BurgerIngredients', () => {
    cy.get('[data-cy="BurgerIngredients"]').should('be.visible');
  });

  it('должен отображать компонент BurgerConstructor', () => {
    cy.get('[data-cy="BurgerConstructor"]').should('be.visible');
  });

  it('должен позволять перетаскивание ингредиента в конструктор бургера', () => {
    cy.get('[data-cy="BurgerIngredients"] [data-cy="IngredientsItem"]').first().as('firstIngredient');

    cy.get('@firstIngredient').trigger('dragstart');
    cy.get('[data-cy="BurgerConstructor"] [data-cy="BurgerConstructorArea"]').trigger('drop');

    cy.get('[data-cy="BurgerConstructor"] .constructor-element').should('have.length.at.least', 1);
  });
});
