import axiosClient from "@/lib/api/axiosClient";

export const addressService = {
  getUserAddresses: async () => {
    const res: any = await axiosClient.get("/addresses");
    return res.data || res;
  },

  createAddress: async (addressData: {
    street: string;
    city: string;
    state?: string;
    postalCode?: string;
    country?: string;
    isDefault?: boolean;
  }) => {
    const res: any = await axiosClient.post("/addresses", addressData);
    return res.data || res;
  },

  updateAddress: async (id: number, addressData: any) => {
    const res: any = await axiosClient.put(`/addresses/${id}`, addressData);
    return res.data || res;
  },

  deleteAddress: async (id: number) => {
    const res: any = await axiosClient.delete(`/addresses/${id}`);
    return res.data || res;
  },
};
