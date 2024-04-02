import { Text } from "@chakra-ui/react";
import UserRecipePreview from "./UserRecipePreview";
import RecipePreview from "../recipes/RecipePreview";

export default function UserLikedRecipeList({ userLikedRecipes, onDelete }) {
  const userId = Number(localStorage.getItem("userId"));

  if (!userLikedRecipes.length) {
    return <Text className="page-width">No recipes liked or created</Text>;
  }

  return (
    <>
      {userLikedRecipes.map((recipe) => {
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
