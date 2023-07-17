import { Container } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

function BaseContainer({ children } : PropsWithChildren<object>) {
  return (
    <Container maxWidth={["100%", null, null, "90vw"]}>{children}</Container>
  )
}

export default BaseContainer
