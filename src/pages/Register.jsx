import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import {
  Box,
  Heading,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import PasswordInput from "../components/PasswordInput";

export default function Register() {
  const { error, loading, register } = useAuth();
  const navigate = useNavigate();

  const methods = useForm();
  const { getValues, handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleRegister = useCallback(
    async ({ username, email, password }) => {
      const loggedIn = await register({username, email, password});

      if (loggedIn) {
        navigate({
          pathname: "/",
          replace: true,
        });
      }
    },
    [register, navigate],
  );

  const validationRules = useMemo(
    () => ({
      username: {
        required: "Username is required",
      },
      email: {
        required: "Email is required",
      },
      password: {
        required: "Password is required",
        minLength: {
          value: 8,
          message: "Password must be at least 8 characters",
        },
        maxLength: {
          value: 30,
          message: "Password must not exceed 30 characters",
        },
      },
      confirmPassword: {
        required: "Password confirmation is required",
        validate: (value) => {
          const password = getValues("password");
          return password === value || "Passwords do not match";
        },
      },
    }),
    [getValues],
  );

  return (
    <Box className="form-width">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleRegister)}>
          <Heading>Register</Heading>
          <Error error={error} />

          <LabelInput
            label="Username"
            name="username"
            type="text"
            placeholder="Your username"
            validationRules={validationRules.username}
          />

          <LabelInput
            label="Email"
            name="email"
            type="email"
            placeholder='your@email.com'
            validationRules={validationRules.email}
          />

          <PasswordInput
            label="Password"
            name="password"
            validationRules={validationRules.password}
          />

          <PasswordInput
            label="Confirm password"
            name="confirmPassword"
            validationRules={validationRules.confirmPassword}
          />

          <ButtonGroup>
            <Button
              colorScheme="orange"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" colorScheme="orange" disabled={loading}>
              Register
            </Button>
          </ButtonGroup>
        </form>
      </FormProvider>
    </Box>
  );
}
