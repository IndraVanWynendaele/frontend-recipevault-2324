import { Link } from "react-router-dom";
import ToggleTheme from "../contexts/Theme.context";
import {
  Flex,
  Box,
  ButtonGroup,
  useColorMode,
  Image,
  Menu,
  MenuButton,
  Button,
  MenuItem,
  MenuList,
  SimpleGrid,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/Auth.context";
import "../css/navbar.css";
import "../css/index.css";

export default function Navbar() {
  const { colorMode } = useColorMode();
  const { isAuthed } = useAuth();

  return (
    <SimpleGrid
      columns={3}
      spacing={5}
      className="navigation"
      bg={colorMode === "dark" ? "gray.700" : "gray.200"}
      color={colorMode === "dark" ? "white" : "black"}
    >
      <Flex>
        <Box className="navigation-links">
          <Link to="/recipes">
            <b>All Recipes</b>
          </Link>
        </Box>
        <Box className="navigation-links">
          <Link to="/recipes/add">
            <b>Add recipe</b>
          </Link>
        </Box>
      </Flex>
      <Box>
        <Link to="/">
          <Image
            className="logo"
            src={`/assets/heading-${
              colorMode === "dark" ? "dark" : "light"
            }-mode.png`}
          />
        </Link>
      </Box>
      <Flex className="right-side-nav">
        <ButtonGroup>
          <ToggleTheme />
          <Menu>
            <MenuButton
              as={Button}
              colorScheme="orange"
              leftIcon={<HamburgerIcon />}
              data-cy="accountMenu"
            >
              My account
            </MenuButton>
            <MenuList>
              {isAuthed ? (
                <>
                  <MenuItem>
                    <Link to="/recipes/users/:id">My recipes</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/logout" data-cy="logoutButton">Log out</Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem>
                    <Link to="/login">Log in</Link>
                  </MenuItem>
                  <MenuItem>
                    <Link to="/register">Sign up</Link>
                  </MenuItem>
                </>
              )}
            </MenuList>
          </Menu>
        </ButtonGroup>
      </Flex>
    </SimpleGrid>
  );
}
