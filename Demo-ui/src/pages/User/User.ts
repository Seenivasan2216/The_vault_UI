import { getSessionuser } from '../../service/session';
import { getMethod, deleteItem, putMethod, postMethod } from '../../service/util';

export interface User {
    userid: number;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
    createdat: Date;
    createdby: string;
    active: boolean;
  }

  export interface ListResponse<T> {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: T[] | never[];
  }


  const sessionUser = getSessionuser() || null;

export const getUsers = async () => {
    const response = await getMethod('getUser');
    console.log(response);
    return response;
}

export const deleteUser = async (UserID: number) => {
    const response = await deleteItem('getUser/' + UserID);
    console.log(response);
    return response;
}

export const updateUser = async (user: User) => {
  console.log('sessionUser',sessionUser)
  user.createdby = sessionUser; 
  console.log('session check ', user);
  const response = await putMethod('getUser/'+ user.userid, user);
  console.log(response);
  return response;
}

export const createUser = async (user: User) => {
  user.createdby = sessionUser; 
  console.log('session check ', user);
  const response = await postMethod('getUser/', user);
  console.log(response);
  return response;
}



