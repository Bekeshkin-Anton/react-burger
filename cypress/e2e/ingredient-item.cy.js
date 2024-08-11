describe('IngredientItem Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('отображение информации об ингредиенте', () => {
    cy.get('[data-cy="IngredientsItem"]').first().as('firstIngredient');
    cy.get('@firstIngredient').find('img').type('image');
    cy.get('@firstIngredient').find('p.text_type_digits-default').should('contain.text', '1255');
    cy.get('@firstIngredient').find('p.text_type_main-default').should('contain.text', 'Краторная булка N-200i');
  });

  it('отображение количества выбранных ингредиентов', () => {
    cy.get('[data-cy="IngredientsItem"]').first().as('firstIngredient');
  });

  it('клик по ингредиенту', () => {
    cy.get('[data-cy="IngredientsItem"]').first().as('firstIngredient');
    cy.get('@firstIngredient').click();
    cy.get('[data-cy="modal"]').should('be.visible').and('contain.text', 'Детали ингредиента');
    // Закрытие модалки
    cy.get('[data-cy="modal"]').find('[data-cy="close-modal-btn"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
  it('проверка drag-and-drop', () => {
    cy.get('[data-cy="IngredientsItem"]').first().as('firstIngredient');
    cy.get('@firstIngredient').trigger('dragstart');
    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');
    cy.get('[data-cy="BurgerConstructorArea"]').find('.constructor-element').should('exist');
  });
});
