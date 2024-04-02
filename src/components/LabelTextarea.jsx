import { useFormContext } from "react-hook-form";
import {
  Textarea,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function LabelTextarea({
  label,
  name,
  type,
  placeholder,
  validationRules,
  ...rest
}) {

  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  const hasError = name in errors;
  
  return (
    <>
      <FormControl isInvalid={hasError}>
        <FormLabel htmlFor={name}>{label}: </FormLabel>
        <Textarea
          focusBorderColor="orange.400"
          size="md"
          {...register(name, validationRules)}
          id={name}
          type={type}
          placeholder={placeholder}
          disabled={isSubmitting}
          {...rest}
        />
        {hasError ? (
          <FormErrorMessage>{errors[name].message}</FormErrorMessage>
        ) : null}
      </FormControl>
    </>
  );
}
