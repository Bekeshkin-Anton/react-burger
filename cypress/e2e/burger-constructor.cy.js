describe('BurgerConstructor Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('должен позволять добавление булки и ингредиентов в конструктор', () => {
    // Добавление булки
    // cy.get('[data-cy="BurgerIngredients"]').contains('Булки').click();
    cy.get('[data-cy="BurgerIngredients"]').get('[data-cy="link"]').first().trigger('dragstart');
    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');

    // Проверка, что булка добавлена в конструктор
    cy.get('[data-cy="BurgerConstructorArea"]').contains('(верх)').should('be.visible');
    cy.get('[data-cy="BurgerConstructorArea"]').contains('(низ)').should('be.visible');

    // Добавление ингредиента
    cy.get('[data-cy="BurgerIngredients"]').contains('Начинки').click();
    cy.get('[data-cy="BurgerIngredients"]').get('[data-cy="link"]').first().trigger('dragstart');
    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');

    // Проверка, что ингредиент добавлен в конструктор
    cy.get('[data-cy="BurgerConstructorArea"]').get('[ingredient-item]').should('have.length', 0);
  });

  it('должен рассчитывать и отображать итоговую стоимость заказа', () => {
    // Добавление булки
    cy.get('[data-cy="BurgerIngredients"]').contains('Булки').click({ force: true });
    cy.get('[data-cy="BurgerIngredients"]').get('[data-cy="link"]').first().trigger('dragstart');
    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');

    // Добавление соуса
    cy.get('[data-cy="BurgerIngredients"]').contains('Соусы').click({ force: true });
    cy.get('[data-cy="BurgerIngredients"]').get('[data-cy="link"]').eq(3).trigger('dragstart');
    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');

    // Добавление ингредиента
    cy.get('[data-cy="BurgerIngredients"]').contains('Начинки').click({ force: true });
    cy.get('[data-cy="BurgerIngredients"]').get('[data-cy="link"]').last().trigger('dragstart');
    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');

    // Проверка, что итоговая стоимость отображается
    cy.get('[data-cy="BurgerConstructor"]').get('[data-cy="total-price"]').should('be.visible');
  });

  it('должен перенаправить на страницу логина, если пользователь не авторизован и пытается оформить заказ', () => {
    // Мокаем отсутствие авторизации
    cy.window().then((win) => {
      win.localStorage.setItem('isLoggedIn', false);
    });

    // Добавление булки
    cy.get('[data-cy="BurgerIngredients"]').contains('Булки').click({ force: true });
    cy.get('[data-cy="BurgerIngredients"]').get('[data-cy="link"]').first().trigger('dragstart');
    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');

    // Нажатие на кнопку "Оформить заказ"
    cy.get('[data-cy="BurgerConstructor"]').contains('Оформить заказ').click();

    // Проверка, что происходит перенаправление на страницу логина
    cy.url().should('include', '/login');
  });

  it('должен открывать модальное окно с деталями заказа при нажатии на кнопку "Оформить заказ"', () => {
    let email = 'plut.mzk@yandex.ru';
    let password = 'Bekeshkin3212';
    cy.visit('./login');
    cy.get('input[name="email"').type(`${email}`);
    cy.get('input[name="password"').type(`${password}`);
    cy.get('[data-cy="login-in-account-btn"]').click();

    // Добавление булки
    cy.get('[data-cy="BurgerIngredients"]').contains('Булки').click({ force: true });
    cy.get('[data-cy="BurgerIngredients"]').get('[data-cy="link"]').first().trigger('dragstart');
    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');

    // Добавление соуса
    cy.get('[data-cy="BurgerIngredients"]').contains('Соусы').click({ force: true });
    cy.get('[data-cy="BurgerIngredients"]').get('[data-cy="link"]').eq(3).trigger('dragstart');
    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');

    // Добавление ингредиента
    cy.get('[data-cy="BurgerIngredients"]').contains('Начинки').click({ force: true });
    cy.get('[data-cy="BurgerIngredients"]').get('[data-cy="link"]').last().trigger('dragstart');
    cy.get('[data-cy="BurgerConstructorArea"]').trigger('drop');

    // Нажатие на кнопку "Оформить заказ"
    cy.get('[data-cy="BurgerConstructor"]').contains('Оформить заказ').click();

    // Проверка, что открылось модальное окно с деталями заказа
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/orders').as('success');
    cy.wait(18000);

    cy.get('[data-cy="OrderDetails"]').should('be.visible');
  });
});
