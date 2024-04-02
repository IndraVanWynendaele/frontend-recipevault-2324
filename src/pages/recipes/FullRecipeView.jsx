import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getById, getAll } from "../../api";
import AsyncData from "../../components/AsyncData";
import Recipe from "../../components/recipes/Recipe";

export default function FullRecipeView() {
  const { id } = useParams();

  const {
    data: recipe = {},
    isLoading: recipeisLoading,
    error: recipeError,
  } = useSWR(`recipes/${id}`, getById);

  const { recipeCategory, recipeDifficulty } = recipe;

  const {
    data: category = {},
    isLoading: categoryIsLoading,
    error: categoryError,
  } = useSWR(recipeCategory ? `categories/${recipeCategory}` : null, getById);
  const {
    data: difficulty = {},
    isLoading: difficultyIsLoading,
    error: difficultyError,
  } = useSWR(
    recipeDifficulty ? `difficulties/${recipeDifficulty}` : null,
    getById,
  );

  const {
    data: ingredientList = [],
    isLoading: ingredientIsLoading,
    error: ingredientError,
  } = useSWR(id ? `ingredients/recipe/${id}` : null, getAll);

  return (
    <>
      <AsyncData
        error={
          recipeError ||
          categoryError ||
          difficultyError ||
          ingredientError
        }
        loading={
          recipeisLoading ||
          categoryIsLoading ||
          difficultyIsLoading ||
          ingredientIsLoading
        }
      >
        <Recipe
          recipe={recipe}
          category={category}
          difficulty={difficulty}
          ingredients={ingredientList}
        />
      </AsyncData>
    </>
  );
}
