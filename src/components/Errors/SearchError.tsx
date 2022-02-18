import { Alert, Stack, AlertIcon } from "@chakra-ui/react";

function SearchError() {
  return (
    <Stack spacing={3}>
      <Alert status="error" variant="subtle">
        <AlertIcon />
        No search made
      </Alert>
    </Stack>
  );
}

export default SearchError;
