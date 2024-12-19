import React from 'react'
import { useState } from 'react'
import { Box, Button, Container, Heading, Input, VStack} from '@chakra-ui/react';
import { Toaster, toaster } from "../components/ui/toaster.jsx"
import { useProductStore } from '../store/product.js'

function CreatePage() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toaster.create({
        title: message,
        duration: 2000,
      });
    } else {
      toaster.create({
        title: "Product created successfully",
        duration: 2000,
      });
      setNewProduct({
        name: "",
        price: "",
        image: "",
      });
    }
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack
        spacing={8}
      >
        <Heading 
          as={"h1"}
          size={"2xl"}
          textAlign={"center"}
          m={8}
        >
          Create New Product
        </Heading>
        <Box
          w={"full"}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>

            <Input
              placeholder='Product Name'
              name='name'
              value={newProduct.name}
              onChange={(e) => setNewProduct({...newProduct, name: e.target.value })}
            >
            </Input>

            <Input
              placeholder='Product Price'
              type='number'
              name='price'
              value={newProduct.price}
              onChange={(e) => setNewProduct({...newProduct, price: e.target.value })}
            >  
            </Input>
            
            <Input
              placeholder='Product Image URL'
              name='image'
              value={newProduct.image}
              onChange={(e) => setNewProduct({...newProduct, image: e.target.value })}
            >
            </Input>

            <Button 
              colorScheme={'blue'}
              onClick={handleAddProduct}
              w={"full"}
            >
              Add Product
            </Button>
          </VStack>

        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage
