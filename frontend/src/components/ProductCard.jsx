import { Box, Heading, HStack, IconButton, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { MdModeEdit, MdDelete } from "react-icons/md";

function ProductCard({product}) {
  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'} 
      _hover={{transform: "translateY(-5px)", shadow: 'xl'}}
      bg={'gray.800'}
    >
     <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}/>

      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
         {product.name}
        </Heading>

        <Text fontWeight={'bold'} fontSize={'xl'} mb={4}>
         ${product.price}
        </Text>

        <HStack>
          <IconButton> <MdModeEdit color='black'/> </IconButton>
          <IconButton> <MdDelete color='black'/> </IconButton>
        </HStack>
      </Box>
    </Box>
  )
}

export default ProductCard
