const getAllTablesByUser = async (req, res) => {
  return res.status(200).send("All the Tables");
};

module.exports = { getAllTablesByUser };
