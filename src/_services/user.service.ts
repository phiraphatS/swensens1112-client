import { authHeader } from '@/_helpers/auth-header';
import { handleResponse } from '@/_helpers/handle-response';
import { message } from 'antd';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';

const storedUser = typeof window !== 'undefined' ? localStorage.getItem('Sw_User') : null;
const parsedUser = storedUser ? JSON.parse(storedUser) : null;
const currentUserSubject = new BehaviorSubject(parsedUser);

export const userService = {
  register,
  logIn,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value
  }
}

async function logIn(params: any) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: params.email,
      password: params.password
    })
  }

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/user/login`, params, requestOptions);
  if (res) { 
    const user = res.data.results
    localStorage.setItem('Sw_User', JSON.stringify(user));
    currentUserSubject.next(user);
    return res.data 
  }

  return null;
}

async function register(params: any): Promise<any> {
  const requestOptions = {
    headers: authHeader(),
  }

  const request = {
    email: params.email,
    first_name: params.firstname,
    last_name: params.lastname,
    gender_id: params.gender,
    birth_date: params.birth_date.$d,
    phone_number: params.tel,
    password: params.password,
    agree_news: Number(params.acception_rule2)
  }

  const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/api/user/register`, request, {})
  if (res) { return res.data }

  return null;
}

function sleeper(ms: number): (x: any) => Promise<any> {
  return function (x: any): Promise<any> {
      return new Promise(resolve => setTimeout(() => resolve(x), ms));
  };
}

function logout() {
  localStorage.removeItem('Sw_User')
  currentUserSubject.next(null)
}