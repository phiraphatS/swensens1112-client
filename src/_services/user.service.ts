import { authHeader } from '@/_helpers/auth-header';
import { message } from 'antd';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const storedUser = typeof window !== 'undefined' ? localStorage.getItem('Sw-User') : null;
const parsedUser = storedUser ? JSON.parse(storedUser) : null;
const currentUserSubject = new BehaviorSubject(parsedUser);

export const userService = {
  register,
  logIn,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
      return currentUserSubject.value
  }
}

async function logIn(params: any) {
  const requestOptions = { 
    headers: authHeader(),
    params: params
  }
  const res = await axios.get(`${process.env.NEXT_PUBLIC_TRAINNING}/api/user/login`, requestOptions);
  if (res) { return res.data }

  return null;
}

async function register(params: any): Promise<any> {
  const requestOptions = { 
    headers: authHeader(),
  }
  
  const request = {
    email: params.email,
    first_name: params.email,
    last_name: params.email,
    gender_id: params.gender_id,
    birth_date: params.birth_date.$d,
    phone_number: params.tel,
    password: params.password,
    agree_news: Number(params.acception_rule2)
  }

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/user/register`, request, {})
  if (res) { return res.data }

  return null;
}