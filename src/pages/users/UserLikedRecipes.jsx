import { useState, useMemo } from "react";
import { SimpleGrid, IconButton, Flex, Box, Input, Center, Heading } from "@chakra-ui/react";
import "../../css/index.css";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { getAll, deleteById } from "../../api";
import AsyncData from "../../components/AsyncData";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import UserLikedRecipeList from "../../components/users/UserLikedRecipeList";

export default function RecipeList() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const userId = localStorage.getItem("userId");

  const { trigger: deleteRecipe, error: deleteError } = useSWRMutation(
    "recipes",
    deleteById,
  );

  const {
    data: userLikedRecipes = [],
    userLikedRecipesIsLoading,
    userLikedRecipesError,
  } = useSWR("userlikedrecipes", getAll);

  const {
    data: recipes = [],
    recipesIsLoading,
    recipesError,
  } = useSWR("recipes", getAll);

  const userLikedIds = userLikedRecipes.map((recipe) => recipe.recipeId);

  const filteredUserRecipes = recipes.filter((recipe) =>
    userLikedIds.includes(recipe.recipeId),
  );

  const {
    data: userRecipes = [],
    userRecipesIsLoading,
    userRecipesError,
  } = useSWR(`recipes/user/${userId}`, getAll);

  const allUserRecipes = useMemo(() => [...filteredUserRecipes, ...userRecipes], [filteredUserRecipes, userRecipes]);

  const filteredRecipes = useMemo(
    () =>
      allUserRecipes.filter((recipe) => {
        return (
          recipe.recipeName.toLowerCase().includes(search.toLowerCase()) ||
          recipe.recipeDescription.includes(search.toLowerCase())
        );
      }),
    [search, allUserRecipes],
  );

  return (
    <>
      <Center><Heading>Liked &amp; created recipes</Heading></Center>
      <Flex className="page-width search">
        <Box className="search-field">
          <Input
            placeholder="Search"
            size="md"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Box>
        <Box>
          <IconButton
            aria-label="CloseIcon"
            icon={<CloseIcon />}
            colorScheme="orange"
            variant="outline"
            onClick={() => {
              setText("");
              setSearch("");
            }}
          />
        </Box>
        <Box>
          <IconButton
            aria-label="Search database"
            icon={<SearchIcon />}
            colorScheme="orange"
            onClick={() => {
              setSearch(text);
            }}
          />
        </Box>
      </Flex>
      <SimpleGrid
        className="page-width"
        minChildWidth="400px"
        spacing="40px"
        justifyContent="center"
        alignItems="center"
      >
        <AsyncData
          loading={
            userLikedRecipesIsLoading ||
            recipesIsLoading ||
            userRecipesIsLoading
          }
          error={
            userLikedRecipesError ||
            recipesError ||
            deleteError ||
            userRecipesError
          }
        >
          <UserLikedRecipeList
            userLikedRecipes={filteredRecipes}
            onDelete={deleteRecipe}
          />
        </AsyncData>
      </SimpleGrid>
    </>
  );
}
