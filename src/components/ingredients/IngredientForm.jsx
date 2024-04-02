import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { Button, Container, ButtonGroup } from "@chakra-ui/react";
import useSWRMutation from "swr/mutation";
import { save, deleteById } from "../../api";
import Error from "../Error";
import "../../css/index.css";
import LabelTextarea from "../LabelTextarea";

const validationRules = {
  ingredientDescription: {
    required: "ingredients are required",
  },
};

export default function IngredientForm({ recipeIngredients, recipe }) {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const { trigger: saveIngredient, error: saveError } = useSWRMutation(
    "ingredients",
    save,
  );

  const { trigger: deleteIngredient, error: deleteError } = useSWRMutation(
    "ingredients",
    deleteById,
  );

  const methods = useForm();
  const { handleSubmit, reset, setValue, isSubmitting } = methods;

  const { recipeId } = recipe;

  const ingredientTextList = recipeIngredients
    .map((ingredient) => ingredient.ingredientDescription)
    .join("\n");

  const onSubmit = useCallback(
    async (data) => {
      const { ingredients } = data;

      if (recipeIngredients.length !== 0) {
        await recipeIngredients.forEach((ingredient) => {
          if (ingredient.recipeId === recipeId) {
            deleteIngredient(ingredient.ingredientId);
          }
        });
      }

      const ingredientsList = ingredients
        .split("\n")
        .map((ingredient) => ingredient.trim());
      await ingredientsList.forEach((ingredient) => {
        saveIngredient({
          ingredientDescription: ingredient,
          recipeId: recipeId,
        });
      });

      navigate(`/recipes/users/${userId}`);
    },
    [saveIngredient, navigate, recipeId, recipeIngredients, deleteIngredient, userId ],
  );

  useEffect(() => {
    if (
      ingredientTextList &&
      typeof ingredientTextList === "string" &&
      ingredientTextList.trim() !== ""
    ) {
      setValue("ingredients", ingredientTextList);
    } else {
      reset();
    }
  }, [ingredientTextList, setValue, reset]);

  return (
    <>
      <Error error={saveError || deleteError} />
      <Container className="form-width">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LabelTextarea
              label="Ingredients"
              name="ingredients"
              type="text"
              placeholder="Ingredients (put every ingredient on a new line)"
              validationRules={validationRules.ingredientDescription}
              data-cy="ingredientDescriptionInput"
            />
            <ButtonGroup>
              <Button
                colorScheme="orange"
                type="submit"
                disabled={isSubmitting}
                data-cy="submitIngredientButton"
              >
                {ingredientTextList.length !== 0 ? "Edit" : "Create"}
              </Button>
            </ButtonGroup>
          </form>
        </FormProvider>
      </Container>
    </>
  );
}
