import React, { useEffect } from 'react'
import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product.js'
import Productcard from '../components/ProductCard.jsx'

function HomePage() {

  const { fetchProducts, products } = useProductStore();
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products", products);

  return (
    <Container 
      maxW= 'container.xl'
      py= {12}
    >
      <VStack spacing={8}>
        <Text
          fontSize={{ base: "22px", sm: "28px" }}
          fontWeight={"bold"}
          textAlign={"center"}
        >
          Current Products
        </Text>

        <SimpleGrid
          columns={{base: 1, md: 2, lg: 3}}
          gap={6}
          w={'full'}
          p={10}
        >
          {products.map((product) => (
            <Productcard key={product.id} product={product}/>
          ))}
        </SimpleGrid>

        <Text fontSize={'xl'} textAlign={'center'} fontWeight={'bold'} color={'gray.500'}>
          No Products Found!
          <Link to={"/create"}>
            <Text p={1} as='span' color={'blue.500'} _hover={{textDecoration: "underline"}}>
              Create a new product
            </Text>
          </Link>
        </Text>
      </VStack>
    </Container>
  )
}

export default HomePage
