import { create } from 'zustand';

export const useProductStore = create((set) => ({
    products: [],
    setProducts: (products) => set({ products }),

    //create product function
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price){
            return {success: false, message:"Please fill in all the required fields"}
        }
        const res = await fetch ("/api/products", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({products: [...state.products, data.data]}))
        return {success: true, message:"products created successfully"}
    },

    //fetch product function
    fetchProducts: async () => {
        const res = await fetch ("/api/products");
        const data = await res.json();
        set({products: data.data});
    }
}))