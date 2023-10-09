import * as React from "react"
import UserTopbar from "./UserTopbar"
// import TabsExample from "./TabsExample"
import { Container } from "@mui/material";
import MainUser from "./MainUser";

export default function User() {
  
  return (
    <Container maxWidth="lg">
        <UserTopbar/>
        <MainUser/>
    </Container>
  );
}
