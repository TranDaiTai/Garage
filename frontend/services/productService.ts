import axiosClient from "@/lib/api/axiosClient";

export const productService = {
  getAllProducts: async (params?: string) => {
    const res: any = await axiosClient.get(`/products?${params || ""}`);
    // Robust unwrap: check res.data.product, res.data.products, res.data, or res
    const root = res.data || res;
    if (root.product && Array.isArray(root.product)) return root.product;
    if (root.products && Array.isArray(root.products)) return root.products;
    if (Array.isArray(root)) return root;
    return [];
  },

  getProductDetails: async (slug: string) => {
    const res: any = await axiosClient.get(`/products/slug/${slug}`);
    // Robust unwrap: check res.data.product, res.data, or res
    const root = res.data || res;
    return root.product || (root.id ? root : null);
  },

  getCategories: async () => {
    const res: any = await axiosClient.get("/categories");
    return res.data || res;
  },

  getPromotions: async () => {
    const res: any = await axiosClient.get("/promotions");
    return res.data || res;
  },

  // Admin Methods
  createProduct: async (productData: any) => {
    const res: any = await axiosClient.post("/products", productData);
    return res.data || null;
  },

  updateProduct: async (id: number | string, productData: any) => {
    const res: any = await axiosClient.put(`/products/${id}`, productData);
    return res.data || null;
  },

  deleteProduct: async (id: number | string) => {
    const res: any = await axiosClient.delete(`/products/${id}`);
    return res.data || null;
  },
};
