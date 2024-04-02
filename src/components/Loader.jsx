import { CircularProgress, Stack } from "@chakra-ui/react";

export default function Loader() {
  return (
    <>
      <Stack align="center" data-cy="loader">
        <CircularProgress color="orange.400" isIndeterminate />
        <span>Loading...</span>
      </Stack>
    </>
  );
}
