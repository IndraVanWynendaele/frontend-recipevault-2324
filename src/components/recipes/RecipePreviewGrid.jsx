import RecipePreview from "./RecipePreview";
import { Text } from "@chakra-ui/react";
import UserRecipePreview from "../users/UserRecipePreview";

export default function RecipePreviewGrid({ recipes, onDelete }) {
  if (!recipes.length) {
    return (
      <Text className="page-width" data-cy="noRecipesMessage">
        No recipes found
      </Text>
    );
  }

  const userId = Number(localStorage.getItem("userId"));

  return (
    <>
      {recipes.map((recipe) => {
        if (recipe.recipeUserId === userId) {
          return (
            <UserRecipePreview
              {...recipe}
              onDelete={onDelete}
              key={recipe.recipeId}
            />
          );
        } else {
          return <RecipePreview {...recipe} key={recipe.recipeId} />;
        }
      })}
    </>
  );
}
