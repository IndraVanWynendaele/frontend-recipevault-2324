import { useParams } from "react-router-dom";
import useSWR from "swr";
import { getById, getAll } from "../../api";
import AsyncData from "../../components/AsyncData";
import RecipeForm from "../../components/recipes/RecipeForm";
import { Heading, Center } from "@chakra-ui/react";

export default function AddOrEditRecipe() {
  const { id } = useParams();

  const {
    data: recipe,
    error: recipeError,
    isLoading: recipeIsLoading,
  } = useSWR(id ? `recipes/${id}` : null, getById);

  const {
    data: categories = [],
    error: categoriesError,
    isLoading: categoriesIsLoading,
  } = useSWR("categories", getAll);

  const {
    data: difficulties = [],
    error: difficultiesError,
    isLoading: difficultiesIsLoading,
  } = useSWR("difficulties", getAll);

  return (
    <>
      <Center>
        <Heading>{id ? "Edit" : "Add"} recipe</Heading>
      </Center>
      <AsyncData
        error={recipeError || categoriesError || difficultiesError}
        loading={
          recipeIsLoading || categoriesIsLoading || difficultiesIsLoading
        }
      >
        <RecipeForm
          recipe={recipe}
          categories={categories}
          difficulties={difficulties}
        />
      </AsyncData>
    </>
  );
}
