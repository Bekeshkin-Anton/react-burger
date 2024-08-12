describe('BurgerConstructor Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  const burgerIngredients = '[data-cy="BurgerIngredients"]';
  const burgerConstructorArea = '[data-cy="BurgerConstructorArea"]';
  const BurgerConstructor = '[data-cy="BurgerConstructor"]';
  it('проверка добавления булки и ингредиентов в конструктор', () => {
    cy.get(burgerIngredients).get('[data-cy="link"]').first().trigger('dragstart');
    cy.get(burgerConstructorArea).trigger('drop');
    cy.get(burgerConstructorArea).contains('(верх)').should('be.visible');
    cy.get(burgerConstructorArea).contains('(низ)').should('be.visible');
    cy.get(burgerIngredients).contains('Начинки').click();
    cy.get(burgerIngredients).get('[data-cy="link"]').first().trigger('dragstart');
    cy.get(burgerConstructorArea).trigger('drop');
    cy.get(burgerConstructorArea).get('[ingredient-item]').should('have.length', 0);
    // показ итоговой стоимости
    cy.get(BurgerConstructor).get('[data-cy="total-price"]').should('be.visible');
  });

  it('должен перенаправить на страницу логина, если пользователь не авторизован и пытается оформить заказ', () => {
    cy.window().then((win) => {
      win.localStorage.setItem('isLoggedIn', false);
    });
    cy.get(burgerIngredients).contains('Булки').click({ force: true });
    cy.get(burgerIngredients).get('[data-cy="link"]').first().trigger('dragstart');
    cy.get(burgerConstructorArea).trigger('drop');
    cy.get(BurgerConstructor).contains('Оформить заказ').click();
    cy.url().should('include', '/login');
  });

  it('должен открывать модальное окно с деталями заказа при нажатии на кнопку "Оформить заказ"', () => {
    let email = 'plut.mzk@yandex.ru';
    let password = 'Bekeshkin3212';
    const modal = '[data-cy="modal"]';
    cy.visit('./login');
    cy.get('input[name="email"').type(`${email}`);
    cy.get('input[name="password"').type(`${password}`);
    cy.get('[data-cy="login-in-account-btn"]').click();
    cy.get(burgerIngredients).contains('Булки').click({ force: true });
    cy.get(burgerIngredients).get('[data-cy="link"]').first().trigger('dragstart');
    cy.get(burgerConstructorArea).trigger('drop');
    cy.get(burgerIngredients).contains('Соусы').click({ force: true });
    cy.get(burgerIngredients).get('[data-cy="link"]').eq(3).trigger('dragstart');
    cy.get(burgerConstructorArea).trigger('drop');
    cy.get(burgerIngredients).contains('Начинки').click({ force: true });
    cy.get(burgerIngredients).get('[data-cy="link"]').last().trigger('dragstart');
    cy.get(burgerConstructorArea).trigger('drop');
    cy.get(BurgerConstructor).contains('Оформить заказ').click();
    cy.get(modal).should('be.visible');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/orders').as('success');
    cy.wait(18000);
    cy.get('[data-cy="OrderDetails"]').should('be.visible');
    // Закрытие модалки
    cy.get(modal).find('[data-cy="close-modal-btn"]').click();
    cy.get(modal).should('not.exist');
  });
});
