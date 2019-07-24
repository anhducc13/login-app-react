import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const errorHandler = (error) => {
  const { status } = error.response;
  if (status === 400)
    toast.error(error.response.data.message || "Error");
    
  return Promise.reject(error)
}

const errorRequest = (error) => {
  toast.error(error.request || "Error");
  return Promise.reject(error)
}

const errorUndefined = (error) => {
  toast.error(error.message || "Error");
  return Promise.reject(error)
}

export { errorHandler, errorRequest, errorUndefined };