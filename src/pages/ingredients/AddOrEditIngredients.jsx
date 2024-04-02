import IngredientForm from "../../components/ingredients/IngredientForm";
import { Heading, Center } from "@chakra-ui/react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { getAll, getById } from "../../api";
import AsyncData from "../../components/AsyncData";

const useLastRecipe = () => {
  const {
    data: recipes = [],
    error: recipesError,
    isLoading: recipesIsLoading,
  } = useSWR("recipes", getAll);

  const sortedRecipes = recipes.sort((a, b) => b.recipeId - a.recipeId);
  const lastRecipe = sortedRecipes[0];

  return {
    lastRecipe,
    recipesError,
    recipesIsLoading,
  };
};

export default function AddOrEditIngredients() {
  const { id } = useParams();
  const {
    data: recipe,
    error: recipeError,
    isLoading: recipeIsLoading,
  } = useSWR(id ? `recipes/${id}` : null, getById);

  const { lastRecipe, recipesError, recipesIsLoading } = useLastRecipe();

  const {
    data: ingredients = [],
    error: ingredientsError,
    isLoading: ingredientsIsLoading,
  } = useSWR(
    id
      ? recipe?.recipeId
        ? `ingredients/recipe/${recipe?.recipeId}`
        : lastRecipe?.recipeId
        ? `ingredients/recipe/${lastRecipe?.recipeId}`
        : null
      : null,
    getAll,
  );

  return (
    <>
      <Center>
        <Heading>{id ? "Edit" : "Add"} ingredients</Heading>
      </Center>
      <AsyncData
        error={ingredientsError || recipesError || recipeError}
        loading={ingredientsIsLoading || recipesIsLoading || recipeIsLoading}
      >
        <IngredientForm
          recipeIngredients={ingredients}
          recipe={recipe ? recipe : lastRecipe}
        />
      </AsyncData>
    </>
  );
}
