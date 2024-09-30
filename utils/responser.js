const successResponse = (message, data, success) => ({
  status: "success",
  message,
  success,
  data,
  totals: Array.isArray(data) ? { count: data.length } : undefined,
});

const errorResponse = (message, error) => ({
  status: "error",
  message: message || "Unknown Error",
  errorDetails: error,
  // errorDetails: error?.optionalMessage || error?.data,
});

const send = (statusCode, message, req, res, data, success = true) => {
  const isSuccess = String(statusCode).startsWith("2");
  const responseData = isSuccess
    ? successResponse(message, data, success)
    : errorResponse(message, data);

  console.log(
    `${isSuccess ? "Success" : "Error"} || ${message} || ${req.originalUrl}`
  );
  res.status(statusCode).send(responseData);
};

export {send};
