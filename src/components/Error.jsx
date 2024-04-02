import { isAxiosError } from "axios";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

export default function Error({ error }) {
  if (isAxiosError(error)) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        maxWidth="lg"
        margin="auto"
        data-cy="axiosErrorMessage"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          Something went wrong!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          {error.response?.data?.message || error.message}
          {error.response?.data?.details && (
            <>
              :
              <br />
              {JSON.stringify(error.response.data.details)}
            </>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  if (error) {
    return (
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        maxWidth="lg"
        margin="auto"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          An unexpected error occured!
        </AlertTitle>
        <AlertDescription>
          {error.message || JSON.stringify(error)}
        </AlertDescription>
      </Alert>
    );
  }

  return null;
}
