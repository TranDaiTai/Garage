import { redirect } from 'react-router-dom';
import axiosClient from '@/api/axiosClient';

export async function protectedLoader({ request }) {
  try {
    const res = await axiosClient.get('/auth/verify'); 
    const user = res.data; // tùy backend trả gì

    if (!user) {
      const url = new URL(request.url);
      const pathnameAndSearch = url.pathname + url.search;
      throw redirect(`/login?redirect=${encodeURIComponent(pathnameAndSearch)}`);
    }

    return { user }; // trả về user cho page
  } catch (err) {
    // 401 / lỗi verify → redirect login
    console.log(err)
    const url = new URL(request.url);
    const pathnameAndSearch = url.pathname + url.search;
    // sessionStorage.clear() ;
    throw redirect(`/login?redirect=${encodeURIComponent(pathnameAndSearch)}`);


  }
}
