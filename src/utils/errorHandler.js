import openNotificationWithIcon from 'helpers/notification';

const errorHandler = (error) => {
  const { status } = error.response;
  if (status === 400)
    openNotificationWithIcon('error', 'Error', error.response.data.message)
  return Promise.reject(error)
}

const errorRequest = (error) => {
  openNotificationWithIcon('error', 'Error', error.request || "")
  return Promise.reject(error)
}

const errorUndefined = (error) => {
  openNotificationWithIcon('error', 'Error', error.message || "")
  return Promise.reject(error)
}

export { errorHandler, errorRequest, errorUndefined };