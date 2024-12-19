import React, { useState } from 'react';
import { Container, Flex, HStack, Text, Button, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";

function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // colors for light and dark modes
  const bgColor = isDarkMode ? "gray.800" : "gray.100";
  const textColor = isDarkMode ? "blue.300" : "blue.500";
  const buttonBgColor = isDarkMode ? "teal.600" : "teal.400";
  const buttonHoverBgColor = isDarkMode ? "teal.500" : "teal.300";

  //Toggle dark mode
  const toggleColorMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Box bg={bgColor} shadow="sm" py={4}>
      <Container maxW="container.lg">
        <Flex 
          h={16} 
          alignItems="center" 
          justifyContent="space-between"
        >
          {/* Logo */}
          <Text 
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight="bold"
            textTransform="uppercase"
            color={textColor}
          >
            <Link to="/">Product Store</Link>
          </Text>

          {/* Navigation Links and Actions */}
          <HStack spacing={4}>
            {/* Add Product Button */}
            <Link to="/create">
              <Button
                bg={buttonBgColor}
                color="white"
                _hover={{ bg: buttonHoverBgColor }}
                size="sm"
              >
                <CiSquarePlus size={20} />
              </Button>
            </Link>

            {/* Toggle Dark/Light Mode */}
            <Button onClick={toggleColorMode} size="sm">
              {isDarkMode ? "🌞 Mode" : "🌙 Mode"}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
