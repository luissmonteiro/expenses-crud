const formatDate = (date) => {
  const dateParts = date.split("/");
  const formattedDate = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
  return formattedDate;
};

const notValidDescription = (description) =>
  description.length > 191 ||
  description.length < 1 ||
  typeof description !== "string";

module.exports = { formatDate, notValidDescription };
