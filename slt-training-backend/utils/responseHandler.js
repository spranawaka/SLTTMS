// utils/responseHandler.js
const successResponse = (res, data, message = 'Success', statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const errorResponse = (res, message = 'Error', statusCode = 500, error = null) => {
  res.status(statusCode).json({
    success: false,
    message,
    error
  });
};

module.exports = {
  successResponse,
  errorResponse
};