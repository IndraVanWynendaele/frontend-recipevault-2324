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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { SmallAddIcon, SmallCloseIcon } from "@chakra-ui/icons";
import "../../css/index.css";
import { memo, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { save, deleteById, getAll } from "../../api";
import useSWRMutation from "swr/mutation";
import useSWR from "swr";
import Error from "../Error";

export default memo(function RecipePreview({
  recipeId,
  recipeName,
  recipeDescription,
  recipePictureUrl,
}) {
  const { trigger: saveLikedRecipe, error: saveError } = useSWRMutation(
    "userLikedRecipes",
    save,
  );

  const { trigger: deleteLikedRecipe, error: deleteError } = useSWRMutation(
    "userLikedRecipes",
    deleteById,
  );
  
  const userId = localStorage.getItem("userId");
  
  const { data: getUserLikedRecipes = [] } = useSWR(
    userId ? "userLikedRecipes" : null,
    getAll,
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (getUserLikedRecipes.find((recipe) => recipe.recipeId === recipeId)) {
      setIsLiked(true);
    }
  }, [getUserLikedRecipes, recipeId]);

  const handleLikedRecipe = useCallback(async () => {
    if (!isLiked) {
      await saveLikedRecipe({ recipeId });
      setIsLiked(true);
    } else {
      await deleteLikedRecipe(recipeId);
      setIsLiked(false);
    }
    window.location.reload();
  }, [saveLikedRecipe, deleteLikedRecipe, recipeId, isLiked]);

  return (
    <>
      <Error error={saveError || deleteError}/>
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
              <IconButton
                colorScheme="orange"
                key={`${recipeId}-edit`}
                aria-label="like recipe"
                icon={isLiked ? <SmallCloseIcon /> : <SmallAddIcon />}
                onClick={userId ? handleLikedRecipe : onOpen}
              />
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>You need to be logged in!</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Text>
                      You can login{" "}
                      <Link to="/login">
                        <u>here</u>
                      </Link>
                      . <br />
                        Don&apos;t have an account yet? You can register{" "}
                      <Link to="/register">
                        <u>here</u>
                      </Link>
                      .
                    </Text>
                  </ModalBody>
                </ModalContent>
              </Modal>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
});
