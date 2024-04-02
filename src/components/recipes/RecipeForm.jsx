import { useCallback, useEffect } from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import {
  Button,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberIncrementStepper,
  Select,
  FormErrorMessage,
  FormControl,
  Container,
  ButtonGroup,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import useSWRMutation from "swr/mutation";
import { save } from "../../api";
import Error from "../Error";
import "../../css/index.css";
import { useNavigate, Link } from "react-router-dom";
import LabelInput from "../LabelInput";
import LabelTextarea from "../LabelTextarea";

const validationRules = {
  recipeName: { required: "Name is required" },
  recipeDescription: { required: "Description is required" },
  recipePictureUrl: { required: "Picture url is required" },
  recipeDuration: {
    valueAsNumber: true,
    required: "Duration (in minutes) is required",
    min: { value: 1, message: "at least 1 min" },
  },
  recipeServings: {
    valueAsNumber: true,
    required: "Amount of servings is required",
    min: { value: 1, message: "min 1" },
    max: { value: 20, message: "max 20" },
  },
  recipeCategory: {
    valueAsNumber: true,
    required: "One category must be selected",
    min: { value: 1, message: "min 1" },
  },
  recipeDifficulty: {
    valueAsNumber: true,
    required: "Difficulty is required",
    min: { value: 1, message: "min 1" },
  },
  recipeInstructions: { required: "Instructions are required" },
};

function LabelNumber({ label, name, defaultValue, validationRules, ...rest }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <>
      <FormControl isInvalid={hasError}>
        <FormLabel htmlFor={name}>{label}: </FormLabel>
        <NumberInput
          min={1}
          focusBorderColor="orange.400"
          defaultValue={defaultValue}
        >
          <NumberInputField
            {...register(name, validationRules)}
            id={name}
            disabled={isSubmitting}
            {...rest}
          />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        {hasError ? (
          <FormErrorMessage data-cy="numberInputError">{errors[name].message}</FormErrorMessage>
        ) : null}
      </FormControl>
    </>
  );
}

function LabelSelect({ label, name, list, validationRules, ...rest }) {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;

  return (
    <>
      <FormControl isInvalid={hasError}>
        <FormLabel htmlFor={name}>{label}: </FormLabel>
        <Select
          focusBorderColor="orange.400"
          {...register(name, validationRules)}
          id={name}
          disabled={isSubmitting}
          {...rest}
        >
          <option defaultChecked value="">
            -- Select an option --
          </option>
          {list.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Select>
        {hasError ? (
          <FormErrorMessage>{`A ${label} is required`}</FormErrorMessage>
        ) : null}
      </FormControl>
    </>
  );
}

export default function RecipeForm({ recipe, categories, difficulties }) {
  const { trigger: saveRecipe, error: saveError } = useSWRMutation(
    "recipes",
    save,
  );

  const navigate = useNavigate();
  
  const userId = localStorage.getItem("userId");

  const methods = useForm();
  const { handleSubmit, reset, setValue, isSubmitting } = methods;

  const onSubmit = useCallback(
    async (data) => {
      const {
        recipeName,
        recipeDescription,
        recipePictureUrl,
        recipeDuration,
        recipeServings,
        recipeCategory,
        recipeDifficulty,
        recipeInstructions,
      } = data;
      await saveRecipe({
        id: recipe?.recipeId,
        recipeName,
        recipeDescription,
        recipePictureUrl,
        recipeDuration,
        recipeServings,
        recipeCategory,
        recipeDifficulty,
        recipeInstructions,
      });

      navigate(
        `/recipes/${
          recipe?.recipeId ? `edit/${recipe?.recipeId}` : "add"
        }/ingredients`,
      );
    },
    [ saveRecipe, navigate, recipe?.recipeId],
  );

  useEffect(() => {
    if (
      recipe &&
      (Object.keys(recipe).length !== 0 || recipe.constructor !== Object)
    ) {
      setValue("recipeName", recipe.recipeName);
      setValue("recipeDescription", recipe.recipeDescription);
      setValue("recipePictureUrl", recipe.recipePictureUrl);
      setValue("recipeDuration", recipe.recipeDuration);
      setValue("recipeServings", recipe.recipeServings);
      setValue("recipeCategory", recipe.recipeCategory);
      setValue("recipeDifficulty", recipe.recipeDifficulty);
      setValue("recipeInstructions", recipe.recipeInstructions);
    } else {
      reset();
    }
  }, [recipe, setValue, reset]);

  return (
    <>
      <Error error={saveError} />
      <Container className="form-width">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <LabelInput
              label="Name"
              name="recipeName"
              type="Input"
              placeholder="Name of your recipe"
              validationRules={validationRules.recipeName}
              data-cy="recipeNameInput"
            />
            <LabelTextarea
              label="Description"
              name="recipeDescription"
              type="Textarea"
              placeholder="Describe your recipe"
              validationRules={validationRules.recipeDescription}
              data-cy="recipeDescriptionTextareaInput"
            />
            <LabelInput
              label="PictureUrl "
              name="recipePictureUrl"
              type="url"
              placeholder="Put a url to your picture here"
              validationRules={validationRules.recipePictureUrl}
              data-cy="recipePictureUrlInput"
            />
            <LabelNumber
              label="Duration in minutes"
              name="recipeDuration"
              defaultValue={30}
              validationRules={validationRules.recipeDuration}
              data-cy="recipeDurationNumberInput"
            />
            <LabelNumber
              label="Servings"
              name="recipeServings"
              defaultValue={2}
              validationRules={validationRules.recipeServings}
              data-cy="recipeServingsNumberInput"
            />
            <LabelSelect
              label="Category"
              name="recipeCategory"
              list={categories}
              validationRules={validationRules.recipeCategory}
              data-cy="recipeCategorySelectInput"
            />
            <LabelSelect
              label="Difficulty"
              name="recipeDifficulty"
              list={difficulties}
              validationRules={validationRules.recipeDifficulty}
              data-cy="recipeDifficultySelectInput"
            />
            <LabelTextarea
              label="Instructions"
              name="recipeInstructions"
              type="Textarea"
              placeholder="Type the instructions for your recipe here"
              validationRules={validationRules.recipeInstructions}
              data-cy="recipeInstructionsTextareaInput"
            />
            <ButtonGroup>
              {recipe?.recipeId ? (
                <Button
                  variant="outline"
                  colorScheme="orange"
                  disabled={isSubmitting}
                  data-cy="cancelRecipeButton"
                >
                  <Link to={`/recipes/users/${userId}`}>Cancel</Link>
                </Button>
              ) : null}
              <Button
                colorScheme="orange"
                type="submit"
                disabled={isSubmitting}
                rightIcon={<ArrowForwardIcon />}
                data-cy="submitRecipeButton"
              >
                {recipe?.recipeId ? "Edit ingredients" : "Create ingredients"}
              </Button>
            </ButtonGroup>
          </form>
        </FormProvider>
      </Container>
    </>
  );
}
