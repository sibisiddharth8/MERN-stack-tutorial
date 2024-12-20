import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { createPortal } from "react-dom";
import { useProductStore } from "../store/product.js";
import { Toaster, toaster } from "../components/ui/toaster.jsx";

function ProductEditModal({ isOpen, onClose, product, onUpdate }) {
  if (!isOpen) return null;

  const [editedProduct, setEditedProduct] = useState({ ...product });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onUpdate(editedProduct);
    onClose();
  };

  return createPortal(
    <Box
      position="fixed"
      top="0"
      left="0"
      w="100vw"
      h="100vh"
      bg="rgba(0, 0, 0, 0.6)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
    >
      <Box
        bg="gray.800"
        rounded="lg"
        shadow="lg"
        p={6}
        w={{ base: "90%", md: "500px" }}
      >
        <Heading size="lg" mb={4}>
          Edit Product
        </Heading>
        <Stack spacing={4}>
          <h5>Product Name: </h5>
          <Input
            placeholder="Product Name"
            value={editedProduct.name}
            name="name"
            onChange={handleInputChange}
            border={'1px solid gray'}
          />
          <h5>Product Price: </h5>
          <Input
            placeholder="Price"
            type="number"
            value={editedProduct.price}
            name="price"
            onChange={handleInputChange}
            border={'1px solid gray'}
          />
          <h5>Product Image: </h5>
          <Input
            placeholder="Image URL"
            value={editedProduct.image}
            name="image"
            onChange={handleInputChange}
            border={'1px solid gray'}
          />
        </Stack>
        <HStack justifyContent="flex-end" mt={4}>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSubmit}>
            Update
          </Button>
        </HStack>
      </Box>
    </Box>,
    document.body // Render outside the component tree
  );
}

function ProductCard({ product }) {
  const { deleteProduct, updateProduct } = useProductStore();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toaster.create({
      title: message || (success ? "Product deleted successfully" : "Error deleting product"),
      duration: 2000,
    });
  };

  const handleUpdateProduct = async (updatedProduct) => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    toaster.create({
      title: message || (success ? "Product updated successfully" : "Error updating product"),
      duration: 2000,
    });
  };

  return (
    <Box
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={"gray.800"}
    >
      <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} mb={4}>
          ${product.price}
        </Text>

        <HStack>
          <IconButton onClick={() => setModalOpen(true)}> <MdModeEdit color='black'/> </IconButton>
          <IconButton onClick={() => handleDeleteProduct(product._id)}> <MdDelete color='black'/> </IconButton>
        </HStack>
      </Box>

      {/* Modal Component */}
      <ProductEditModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        product={product}
        onUpdate={handleUpdateProduct}
      />
    </Box>
  );
}

export default ProductCard;
