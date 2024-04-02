import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Image,
  Heading,
  Button,
  Text,
  ButtonGroup,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import "../../css/index.css";
import { memo, useCallback } from "react";
import { Link } from "react-router-dom";

export default memo(function UserRecipePreview({
  recipeId,
  recipeName,
  recipeDescription,
  recipePictureUrl,
  onDelete,
  }) {

  const handleDelete = useCallback(() => {
    onDelete(recipeId);
    window.location.reload();
  }, [recipeId, onDelete]);

  return (
    <>
      <Card
        key={recipeId}
        className="recipe-card"
        direction="row"
        overflow="hidden"
        variant="outline"
        data-cy="recipePreview"
      >
        <Image
          className="recipe-list-image"
          src={recipePictureUrl}
          alt={recipeName}
          data-cy="recipePreviewImage"
        />
        <Stack>
          <CardHeader>
            <Heading as="h2" size="lg" data-cy="recipePreviewName">
              {recipeName}
            </Heading>
          </CardHeader>
          <CardBody>
            <Text py="2" data-cy="recipePreviewDescription">
              {recipeDescription}
            </Text>
          </CardBody>
          <CardFooter>
            <ButtonGroup>
              <Button colorScheme="orange" variant="outline" key={recipeId}>
                <Link data-cy="fullRecipeLink" to={`/recipes/${recipeId}`}>
                  Full recipe
                </Link>
              </Button>
              <Link data-cy="recipeEditButton" to={`/recipes/edit/${recipeId}`}>
                <IconButton
                  colorScheme="orange"
                  aria-label="Edit recipe"
                  icon={<EditIcon />}
                />
              </Link>
              <IconButton
                data-cy="recipeRemoveButton"
                colorScheme="orange"
                aria-label="Delete recipe"
                icon={<DeleteIcon />}
                onClick={handleDelete}
              ></IconButton>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
});
