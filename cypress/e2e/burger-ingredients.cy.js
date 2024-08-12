describe('BurgerIngredients Component', () => {
  const BurgerIngredientsTabsWrapper = '[data-cy="BurgerIngredientsTabsWrapper"]';
  const modal = '[data-cy="modal"]';
  const BurgerIngredients = '[data-cy="BurgerIngredients"]';
  beforeEach(() => {
    cy.visit('/');
  });
  it('должен отображать вкладки "Булки", "Соусы" и "Начинки"', () => {
    cy.get(BurgerIngredientsTabsWrapper).contains('Булки').should('be.visible');
    cy.get(BurgerIngredientsTabsWrapper).contains('Соусы').should('be.visible');
    cy.get(BurgerIngredientsTabsWrapper).contains('Начинки').should('be.visible');
  });

  it('должен отображать список ингредиентов в соответствующих категориях', () => {
    cy.get(BurgerIngredients).get('#one [data-cy="link"]').should('have.length', 0);
    cy.get(BurgerIngredients).get('#two [data-cy="link"]').should('have.length', 0);
    cy.get(BurgerIngredients).get('#three [data-cy="link"]').should('have.length', 0);
  });

  it('должен показывать сообщение об ошибке, если данные не загружены', () => {
    cy.intercept('GET', '/api/ingredients', {
      statusCode: 500,
      body: {},
    });

    cy.visit('/');

    cy.get(BurgerIngredients).contains('Произошла ошибка при получении данных').should('be.visible');
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
    cy.get(BurgerIngredients).get('[data-cy="link"]').first().click();
    cy.get(modal).should('be.visible');
    cy.get(modal).contains('Детали ингредиента').should('exist');
    // Закрытие модалки
    cy.get(modal).find('[data-cy="close-modal-btn"]').click();
    cy.get(modal).should('not.exist');
  });
});
