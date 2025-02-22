import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: 'http://localhost:5000',
  baseURL: 'https://to-do-app-server-side.vercel.app',
  withCredentials: true
})


const useAxiosPublic = () => {
  return axiosPublic
}

export default useAxiosPublic

