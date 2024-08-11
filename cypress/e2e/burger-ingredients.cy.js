describe('BurgerIngredients Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('должен отображать вкладки "Булки", "Соусы" и "Начинки"', () => {
    cy.get('[data-cy="BurgerIngredientsTabsWrapper"]').contains('Булки').should('be.visible');
    cy.get('[data-cy="BurgerIngredientsTabsWrapper"]').contains('Соусы').should('be.visible');
    cy.get('[data-cy="BurgerIngredientsTabsWrapper"]').contains('Начинки').should('be.visible');
  });

  it('должен отображать список ингредиентов в соответствующих категориях', () => {
    cy.get('[data-cy="BurgerIngredients"]').get('#one [data-cy="link"]').should('have.length', 0);
    cy.get('[data-cy="BurgerIngredients"]').get('#two [data-cy="link"]').should('have.length', 0);
    cy.get('[data-cy="BurgerIngredients"]').get('#three [data-cy="link"]').should('have.length', 0);
  });

  it('должен показывать сообщение об ошибке, если данные не загружены', () => {
    cy.intercept('GET', '/api/ingredients', {
      statusCode: 500,
      body: {},
    });

    cy.visit('/');

    cy.get('[data-cy="BurgerIngredients"]').contains('Произошла ошибка при получении данных').should('be.visible');
  });

  it('должен показывать индикатор загрузки при запросе данных', () => {
    cy.intercept('GET', '/api/ingredients', (req) => {
      req.reply((res) => {
        res.delay(1000);
        res.send({ fixture: 'ingredients.json' });
      });
    });

    cy.visit('/');

    cy.get('[data-cy="loader"]').should('be.visible');
  });

  it('должен открывать модалку при клике на ингредиент и закрывать модалку', () => {
    cy.get('[data-cy="BurgerIngredients"]').get('[data-cy="link"]').first().click();
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="modal"]').contains('Детали ингредиента').should('exist');
    // Закрытие модалки
    cy.get('[data-cy="modal"]').find('[data-cy="close-modal-btn"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
