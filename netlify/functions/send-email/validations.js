const validateParams = body => {
  return body.subject && body.text;
};

module.exports = {
  validateParams
};
