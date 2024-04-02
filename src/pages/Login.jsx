import { useCallback, useMemo } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import LabelInput from "../components/LabelInput";
import { useAuth } from "../contexts/Auth.context";
import Error from "../components/Error";
import { Heading, Button, ButtonGroup, Box } from "@chakra-ui/react";
import PasswordInput from "../components/PasswordInput";

const validationRules = {
  email: {
    required: "Email is required",
  },
  password: {
    required: "Password is required",
  },
};

export default function Login() {
  const { error, loading, login } = useAuth();
  const navigate = useNavigate();
  const { search } = useLocation();

  const redirect = useMemo(() => {
    const urlParams = new URLSearchParams(search);
    if (urlParams.has("redirect")) return urlParams.get("redirect");
    return "/";
  }, [search]);

  const methods = useForm();

  const { handleSubmit, reset } = methods;

  const handleCancel = useCallback(() => {
    reset();
  }, [reset]);

  const handleLogin = useCallback(
    async ({ email, password }) => {
      const loggedIn = await login(email, password);

      if (loggedIn) {
        navigate({
          pathname: redirect,
          replace: true,
        });
      }
    },
    [login, navigate, redirect],
  );

  return (
    <Box className="form-width">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleLogin)}>
          <Heading>Log in</Heading>
          <Error error={error} />

          <LabelInput
            label="email"
            name="email"
            type="text"
            placeholder="your@email.com"
            validationRules={validationRules.email}
            data-cy="emailInput"
          />

          <PasswordInput
            label="Password"
            name="password"
            validationRules={validationRules.password}
            data-cy="passwordInput"
          />

          <ButtonGroup>
            <Button
              onClick={handleCancel}
              colorScheme="orange"
              variant="outline"
            >
              <Link to="/">Cancel</Link>
            </Button>
            <Button type="submit" disabled={loading} colorScheme="orange" data-cy="loginButton">
              Log in
            </Button>
          </ButtonGroup>
        </form>
      </FormProvider>
    </Box>
  );
}
