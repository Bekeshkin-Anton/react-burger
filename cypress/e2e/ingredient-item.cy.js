describe('IngredientItem Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('должен корректно отображать информацию об ингредиенте', () => {
    cy.get('[data-cy="IngredientsItem"]').first().as('firstIngredient');

    cy.get('@firstIngredient').find('img').type('image');
    cy.get('@firstIngredient').find('p.text_type_digits-default').should('contain.text', '1255');
    cy.get('@firstIngredient').find('p.text_type_main-default').should('contain.text', 'Краторная булка N-200i');
  });

  it('должен корректно отображать количество выбранных ингредиентов', () => {
    cy.get('[data-cy="IngredientsItem"]').first().as('firstIngredient');
  });

  it('должен корректно обрабатывать клик по ингредиенту', () => {
    cy.get('[data-cy="IngredientsItem"]').first().as('firstIngredient');

    cy.get('@firstIngredient').click();

    cy.get('[data-cy="modal"]').should('be.visible').and('contain.text', 'Детали ингредиента');
  });

  it('должен поддерживать drag-and-drop функциональность', () => {
    cy.get('[data-cy="IngredientsItem"]').first().as('firstIngredient');

    cy.get('@firstIngredient').trigger('dragstart');

    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');

    cy.get('[data-cy="BurgerConstructorArea"]').find('.constructor-element').should('exist');
  });
});
