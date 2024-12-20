import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    // Create product function
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price) {
            return { success: false, message: "Please fill in all the required fields" };
        }
        const res = await fetch("/api/products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
    },

    // Fetch products function
    fetchProducts: async () => {
        const res = await fetch("/api/products");
        const data = await res.json();
        set({ products: data.data });
    },

    // Delete product function
    deleteProduct: async (pid) => {
        const res = await fetch(`/api/products/${pid}`, {
            method: "DELETE"
        });
        const data = await res.json();
        if (!data.success) return { success: false, message: data.message };

        set(state => ({ products: state.products.filter((product) => product._id !== pid) }));
        return { success: true, message: data.message };
    },

    // Update product function
    updateProduct: async (pid, updatedProduct) => {
        if (!updatedProduct.name || !updatedProduct.image || !updatedProduct.price) {
            return { success: false, message: "Please fill in all the required fields" };
        }

        const res = await fetch(`/api/products/${pid}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });
        const data = await res.json();

        if (!data.success) return { success: false, message: data.message };

        // Update the state with the updated product
        set((state) => ({
            products: state.products.map((product) =>
                product._id === pid ? { ...product, ...updatedProduct } : product
            )
        }));

        return { success: true, message: "Product updated successfully" };
    }
}));
