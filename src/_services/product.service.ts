import { authHeader } from '@/_helpers/auth-header';
import axios from 'axios';

export const productService = {
  getCategory,
  getProduct,
  addProduct,
  deleteProduct,
  editProduct,
  createCategory,
  removeCategory,
}

async function getCategory() {
  // const requestOptions = {
  //   headers: authHeader(),
  //   params: params
  // }

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/product/get-category`);
  if (res) {
    return res.data
  }

  return null;
}

async function getProduct(_id: number) {
  const requestOptions = {
    params: { id: _id }
  }

  const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/api/product/get-product`, requestOptions);
  if (res) {
    return res.data
  }

  return null;
}

async function addProduct(params: any) {
  const requestOptions = {
    headers: {
      ...authHeader(),
      'Content-Type': 'multipart/form-data'
    },
  }

  const formData = new FormData();
  formData.append('file', params.file);
  formData.append('product_name', params.product_name);
  formData.append('detail', params.detail);
  formData.append('price', params.price);
  formData.append('category_id', params.category_id);

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/product/insert-prod`, formData, requestOptions);
  if (res) {
    return res.data
  }

  return null;
}

async function editProduct(params: any) {
  const requestOptions = {
    headers: authHeader()
  }

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/product/edit-product`, params, requestOptions);
  if (res) {
    return res.data
  }

  return null;
}

async function deleteProduct(params: any) {
  const requestOptions = {
    headers: authHeader()
  }

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/product/remove-product`, params, requestOptions);
  if (res) {
    return res.data
  }

  return null;
}

async function createCategory(params: any) {
  const requestOptions = {
    headers: authHeader()
  }

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/product/create-category`, params, requestOptions);
  if (res) {
    return res.data
  }

  return null;
}

async function removeCategory(params: any) {
  const requestOptions = {
    headers: authHeader()
  }

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/product/remove-category`, params, requestOptions);
  if (res) {
    return res.data
  }

  return null;
}