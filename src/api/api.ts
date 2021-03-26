import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  /*headers: {
    "API-KEY": "debbd9e5-51f4-44e1-b1d8-ad026688cc54"* - exampe of adding API_KEY for REST API REQUESTS/
  },*/
  /*baseURL: 'https://social-network.samuraijs.com/api/1.0/' - baseUrl example*/
});

/* Example of an REST API request with axios
export const appAPI = {
  getUsers: (currentPage = 1, pageSize = 10) => {
    return instance.get(`users?page=${currentPage }&count=${pageSize}`,)
    .then(response => {
        return response.data;
      });
  }
}
*/