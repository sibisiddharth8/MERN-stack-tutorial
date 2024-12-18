import React from 'react';
import { Container, Flex, HStack, Text, Button, Box } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";

function Navbar() {
  return (
    <Box bg="gray.100" shadow="sm">
      <Container maxW="container.lg">
        <Flex 
          h={16} 
          alignItems="center" 
          justifyContent="space-between" 
          flexDir={{ base: "column", sm: "row" }}
        >
          {/* Logo */}
          <Text 
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight="bold"
            textTransform="uppercase"
            color="blue.500"
            textAlign={{ base: "center", sm: "left" }}
          >
            <Link to="/">Product Store</Link>
          </Text>

          {/* Navigation Links and Actions */}
          <HStack spacing={4} mt={{ base: 4, sm: 0 }}>
            {/* Add Product Button */}
            <Link to="/create">
              <Button
                colorScheme="teal"
                variant="solid"
                size="sm"
              >
                <CiSquarePlus size={20} color='black'/>
              </Button>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}

export default Navbar;
