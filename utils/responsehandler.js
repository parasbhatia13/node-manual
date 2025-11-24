const responsehandler = (
  response,
  isError = false,
  message,
  data,
  statusCode = 200
) => {
  return response.status(statusCode).json({
    isError,
    message,
    data,
  });
};

export default responsehandler;
