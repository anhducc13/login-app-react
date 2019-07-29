import openNotificationWithIcon from 'helpers/notification';

const errorHandler = (error) => {
  const { status } = error.response;
  if (status === 400)
    openNotificationWithIcon('error', 'Error', error.response.data.message)
  return Promise.reject(error)
}

const errorRequest = (error) => {
  openNotificationWithIcon('error', 'Error', "Request Error")
  return Promise.reject(error)
}

const errorUndefined = (error) => {
  openNotificationWithIcon('error', 'Error', "Error")
  return Promise.reject(error)
}

export { errorHandler, errorRequest, errorUndefined };