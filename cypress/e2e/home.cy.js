describe('HomePage Component', () => {
  beforeEach(() => {
    // Переход на главную страницу перед каждым тестом
    cy.visit('/');
  });

  it('должен отображать заголовок "Соберите бургер"', () => {
    // Проверяем наличие заголовка с текстом
    cy.get('h1').should('contain.text', 'Соберите бургер');
  });

  it('должен отображать компонент BurgerIngredients', () => {
    // Проверяем, что компонент BurgerIngredients присутствует на странице
    cy.get('section').first().should('have.attr', '[data-cy="BurgerIngredients"]');
    cy.get('section[data-cy="BurgerIngredients"]').should('be.visible');
  });

  it('должен отображать компонент BurgerConstructor', () => {
    // Проверяем, что компонент BurgerConstructor присутствует на странице
    cy.get('section').last().should('have.class', 'burger__constructor');
    cy.get('section.burger__constructor').should('be.visible');
  });

  it('проверка Drag-and-Drop функциональности', () => {
    // Здесь мы предполагаем, что можно "перетащить" ингредиент в конструктор
    // Ищем первый элемент из BurgerIngredients и перетаскиваем его в BurgerConstructor
    cy.get('.ingredient-item').first().trigger('dragstart');
    cy.get('.constructor-dropzone').trigger('drop');

    // Проверка, что элемент был добавлен в конструктор
    cy.get('.constructor-element').should('have.length.at.least', 1);
  });
});
