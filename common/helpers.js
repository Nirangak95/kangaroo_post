const successResponse = ({
  message = null,
  data = null,
  errorCode = null,
}) => ({
  status: true,
  message,
  data,
  errorCode,
});

const errorResponse = ({ message = null, data = null, errorCode = null }) => ({
  status: false,
  message,
  errorCode,
  data,
});

module.exports = { successResponse, errorResponse };
