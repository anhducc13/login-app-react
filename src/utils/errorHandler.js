import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const errorHandler = (error) => {
  const {status} = error.response;
  let errorStatus = 500;
  if (status === 400)
    errorStatus = 400
  else if (status === 404)
    errorStatus = 404
  else if (status > 400 && status < 500)
    errorStatus = 403

  switch(errorStatus) {
    case 403:
      toast.error("Session expired. Please login to continue!" || "Error");
      break;
    case 400:
    case 404:
      toast.error(error.response.data.message || "Error");
      break;
    default:
  }
  return Promise.reject(errorStatus)
}

const errorRequest = (error) => {
  toast.error(error.request || "Error");
  return Promise.reject(0)
}

const errorUndefined = (error) => {
  toast.error(error.message || "Error");
  return Promise.reject(0)
}

export { errorHandler, errorRequest, errorUndefined };