describe('recipes list', () => {
    it('should show all the recipes', () => {
        cy.intercept(
            "GET", 
            "http://localhost:9000/api/recipes", 
            { fixture: 'recipes.json' },
        );

        cy.visit('http://localhost:5173/recipes/');
        cy.get('[data-cy=recipePreview').should('have.length', 1);
        cy.get('[data-cy=recipePreviewName]').eq(0).contains('Stuffed Bell Peppers with Minced Beef and Veggies');
        cy.get('[data-cy=recipePreviewDescription]').eq(0).contains('Savor the delicious combination of bell peppers filled with seasoned minced beef and colorful veggies.');
        cy.get('[data-cy=recipePreviewImage]').eq(0).should('have.attr', 'src', 'https://i.pinimg.com/564x/bf/fa/db/bffadb17fd2e222ab656026e3dd7c51f.jpg');
    });

    it('should show a loading indicator for a very slow response', () => {
        cy.intercept(
            "http://localhost:9000/api/recipes",
            (req) => {
                req.on("response", (res) => {
                    res.setDelay(1000);
                });
            },
        ).as("slowResponse");
        cy.visit('http://localhost:5173/recipes/');
        cy.get('[data-cy=loader]').should('be.visible');
        cy.wait('@slowResponse');
        cy.get('[data-cy=loader]').should('not.exist');
    });

    it('should show all recipes that have "Bell pepper" in their name or description', () => {
        cy.visit('http://localhost:5173/recipes/');

        cy.get('[data-cy=recipesSearchInput').type('bell pepper');
        cy.get('[data-cy=recipesSearchButton').click();

        cy.get('[data-cy=recipePreview').should('have.length', 1);
        cy.get('[data-cy=recipePreviewName]').eq(0).contains('Stuffed Bell Peppers with Minced Beef and Veggies');
    });

    it('should show all recipes after clearing search', () => {
        cy.intercept(
            "GET", 
            "http://localhost:9000/api/recipes", 
            { fixture: 'recipes.json' },
        );

        cy.visit('http://localhost:5173/recipes/');

        cy.get('[data-cy=recipesSearchInput').type('one');
        cy.get('[data-cy=recipesSearchButton').click();

        cy.get('[data-cy=recipesSearchClearInput').click();

        cy.get('[data-cy=recipePreview').should('have.length', 1);
        cy.get('[data-cy=recipePreviewName]').eq(0).contains('Stuffed Bell Peppers with Minced Beef and Veggies');
    });

    it('should show a message when no recipes are found', () => {
        cy.visit('http://localhost:5173/recipes/');

        cy.get('[data-cy=recipesSearchInput').type('xyz');
        cy.get('[data-cy=recipesSearchButton').click();

        cy.get('[data-cy=noRecipesMessage').should('exist');
    });

    it('should show an error if the API call fails', () => {
        cy.intercept(
            "GET", 
            "http://localhost:9000/api/recipes", 
            { 
                statusCode: 500,
                body: {
                    error: "Internal server error",
                },
            },
        );
        cy.visit('http://localhost:5173/recipes/');

        cy.get('[data-cy=axiosErrorMessage]').should('exist');
    });

    it('should show the full recipe when clicking on the full recipe', () => {
        cy.visit('http://localhost:5173/recipes/');
        cy.get('[data-cy=fullRecipeLink').eq(9).click();

        cy.get('[data-cy=recipeImage').should('have.attr', 'src', 'https://i.pinimg.com/564x/20/dd/98/20dd98d752c6769f4b22ff3e0eeec867.jpg');
        cy.get('[data-cy=recipeName]').contains('Stuffed Bell Peppers with Minced Beef and Veggies');
        cy.get('[data-cy=recipeDescription]').contains('Savor the delicious combination of bell peppers filled with seasoned minced beef and colorful veggies.');
        cy.get('[data-cy=recipeCategory]').contains('Breakfast');
        cy.get('[data-cy=recipeDuration]').contains(30);
        cy.get('[data-cy=recipeServings]').contains(2);
        cy.get('[data-cy=recipeDifficulty]').contains('Easy');
        cy.get('[data-cy=recipeIngredients').should('have.length', 1);
        cy.get('[data-cy=recipeIngredients]').eq(0).contains('5 grams of ingredient_one');
        cy.get('[data-cy=recipeInstructions]').contains('recipe one instructions');
    });
});