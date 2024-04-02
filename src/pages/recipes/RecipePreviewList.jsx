import RecipePreviewGrid from "../../components/recipes/RecipePreviewGrid";
import { useState, useMemo } from "react";
import { SimpleGrid, IconButton, Flex, Box, Input } from "@chakra-ui/react";
import "../../css/index.css";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { getAll, deleteById } from "../../api";
import AsyncData from "../../components/AsyncData";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function RecipePreviewList() {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const { data: recipes = [], isLoading, error } = useSWR("recipes", getAll);

  const { trigger: deleteRecipe, error: deleteError } = useSWRMutation(
    "recipes",
    deleteById,
  );

  const filteredRecipes = useMemo(
    () =>
      recipes
        .filter((recipe) => {
          return (
            recipe.recipeName.toLowerCase().includes(search.toLowerCase()) ||
            recipe.recipeDescription.includes(search.toLowerCase())
          );
        })
        .sort((a, b) => a.recipeName.localeCompare(b.recipeName)),
    [search, recipes],
  );

  return (
    <>
      <Flex className="page-width search">
        <Box className="search-field">
          <Input
            placeholder="Search"
            size="md"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            data-cy="recipesSearchInput"
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
            data-cy="recipesSearchClearInput"
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
            data-cy="recipesSearchButton"
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
        <AsyncData loading={isLoading} error={error || deleteError}>
          <RecipePreviewGrid recipes={filteredRecipes} onDelete={deleteRecipe}/>
        </AsyncData>
      </SimpleGrid>
    </>
  );
}
