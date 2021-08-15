/**
 * Custom Error Handler, for easy frontend integration and Error template
 * @param {any} res - Express Response for returning json data with status. `Required`
 * @param {number} status - Status code for the response from the server.`Optional`
 * @param {string} message - Message to be sent to the client side by the server. `Optional`
 * @param {Error} error - If status is 500, it will show the error message. `Optional`
 * @returns {void} - Will Return json data with Express status and error message. `Optional`
 */

const customErrorHandler = (
  res,
  status = 500,
  message = "Internal Server Error",
  error
) => {
  res.status(status || 500).json({
    msgError: true,
    message,
    err: error ? error.message : undefined,
  });
};

module.exports = customErrorHandler;
