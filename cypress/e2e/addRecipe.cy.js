describe('add recipe', () => {

    beforeEach(() => {
        cy.login('indra.vanwynendaele@gmail.com', '12345678');
    });

    it('should add a recipe with ingredients', () => {
        cy.visit('http://localhost:5173/recipes/add');

        cy.get('[data-cy=recipeNameInput]').type('test recipe');
        cy.get('[data-cy=recipeDescriptionTextareaInput]').type('test description');
        cy.get('[data-cy=recipePictureUrlInput]').type('https://i.pinimg.com/564x/85/54/7f/85547f0a7b988769d5a70f372eef9d15.jpg');
        cy.get('[data-cy=recipeDurationNumberInput]').clear();
        cy.get('[data-cy=recipeDurationNumberInput]').type('10');
        cy.get('[data-cy=recipeServingsNumberInput]').clear();
        cy.get('[data-cy=recipeServingsNumberInput]').type('2');
        cy.get('[data-cy=recipeCategorySelectInput').select('Lunch');
        cy.get('[data-cy=recipeDifficultySelectInput').select('Easy');
        cy.get('[data-cy=recipeInstructionsTextareaInput]').type('test ingredient instructions');
        cy.get('[data-cy=submitRecipeButton]').click();

        cy.get('[data-cy=ingredientDescriptionInput').type('test ingredient 1 \n test ingredient 2');
        cy.get('[data-cy=submitIngredientButton]').click();

        cy.get('[data-cy=recipePreviewName]').eq(3).contains('test recipe');
        cy.get('[data-cy=recipePreviewDescription]').eq(3).contains('test description');
        cy.get('[data-cy=recipePreviewImage]').eq(3).should('have.attr', 'src', 'https://i.pinimg.com/564x/85/54/7f/85547f0a7b988769d5a70f372eef9d15.jpg');

        cy.get('[data-cy=recipePreview').should('have.length', 4);
    });

    it('should show the error message for an invalid servings amount', () => {
        cy.visit('http://localhost:5173/recipes/add');

        cy.get('[data-cy=recipeNameInput]').type('test recipe');
        cy.get('[data-cy=recipeDescriptionTextareaInput]').type('test description');
        cy.get('[data-cy=recipePictureUrlInput]').type('https://i.pinimg.com/564x/85/54/7f/85547f0a7b988769d5a70f372eef9d15.jpg');
        cy.get('[data-cy=recipeDurationNumberInput]').clear();
        cy.get('[data-cy=recipeDurationNumberInput]').type('10');
        cy.get('[data-cy=recipeServingsNumberInput]').clear();
        cy.get('[data-cy=recipeServingsNumberInput]').type('22');
        cy.get('[data-cy=recipeCategorySelectInput').select('Lunch');
        cy.get('[data-cy=recipeDifficultySelectInput').select('Easy');
        cy.get('[data-cy=recipeInstructionsTextareaInput]').type('test ingredient instructions');
        cy.get('[data-cy=submitRecipeButton]').click();

        cy.get('[data-cy=numberInputError').contains('max 20');
    });
});