import {
  Card,
  CardHeader,
  Image,
  Heading,
  CardBody,
  Stack,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import "../../css/index.css";
import "../../css/recipes.css";
import { memo } from "react";

export default memo(function Recipe({
  recipe,
  category,
  difficulty,
  ingredients,
}) {
  const {
    recipeName,
    recipePictureUrl,
    recipeDescription,
    recipeDuration,
    recipeServings,
    recipeInstructions,
  } = recipe;

  return (
    <>
      <Card data-cy="recipe" className="page-width">
        <CardHeader>
          <Image
            className="recipe-image"
            src={recipePictureUrl}
            alt={recipeName}
            borderRadius="xl"
            data-cy="recipeImage"
          ></Image>
          <Heading data-cy="recipeName">{recipeName}</Heading>
          <br />
          <Text data-cy="recipeDescription">{recipeDescription}</Text>
        </CardHeader>
        <CardBody>
          <Stack>
            <Table>
              <Thead>
                <Tr>
                  <Th>Category</Th>
                  <Th>Duration</Th>
                  <Th>Servings</Th>
                  <Th>Difficulty</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td
                    data-cy="recipeCategory"
                    key={`category-${category.name}`}
                  >
                    {category.name}
                  </Td>
                  <Td
                    data-cy="recipeDuration"
                    key={`duration-${recipeDuration}`}
                  >
                    {recipeDuration}
                  </Td>
                  <Td
                    data-cy="recipeServings"
                    key={`servings-${recipeServings}`}
                  >
                    {recipeServings}
                  </Td>
                  <Td
                    data-cy="recipeDifficulty"
                    key={`name-${difficulty.name}`}
                  >
                    {difficulty.name}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <br />
            <Heading size="md">Ingredients</Heading>
            <List spacing={3}>
              {ingredients.map((ingredient) =>  {
                  return (
                    <ListItem key={ingredient.ingredientId} data-cy="recipeIngredients">
                      <ListIcon as={ChevronRightIcon} color="orange.500" />
                      {ingredient.ingredientDescription}
                    </ListItem>
                  );
                },
              )}
            </List>
            <br />
            <Heading size="md">Instructions</Heading>
            <Text data-cy="recipeInstructions">{recipeInstructions}</Text>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
});
