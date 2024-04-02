import { useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Input,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

export default function PasswordInput({
  name,
  label,
  validationRules,
  ...rest
}) {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const hasError = name in errors;

  return (
    <>
      <FormControl isInvalid={hasError}>
        <FormLabel htmlFor={name}>{label}: </FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter password"
            focusBorderColor="orange.400"
            {...register(name, validationRules)}
            disabled={isSubmitting}
            {...rest}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              size="sm"
              colorScheme="orange"
              variant="outline"
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        {hasError ? (
          <FormErrorMessage>{errors[name].message}</FormErrorMessage>
        ) : null}
      </FormControl>
    </>
  );
}
