const prisma = require("../prisma");

exports.createUser = async (req, res) => {
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const user = await prisma.user.create({
    data: { name, email, role }
  });

  res.json(user);
};

exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};

exports.updateUser = async (req, res) => {
  const id = parseInt(req.params.id);

  const user = await prisma.user.update({
    where: { id },
    data: req.body
  });

  res.json(user);
};

exports.deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.user.delete({ where: { id } });

  res.json({ message: "Deleted" });
};