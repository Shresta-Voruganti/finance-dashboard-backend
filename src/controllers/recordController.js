const prisma = require("../prisma");


exports.createRecord = async (req, res) => {
  const { amount, type, category, date, notes } = req.body;

  // ✅ ADD VALIDATION HERE
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return res.status(400).json({ message: "Invalid amount" });
  }

  if (!["INCOME", "EXPENSE"].includes(type)) {
    return res.status(400).json({ message: "Invalid type" });
  }

  if (!category) {
    return res.status(400).json({ message: "Category required" });
  }

  if (!date) {
    return res.status(400).json({ message: "Date required" });
  }

  // existing logic
  const record = await prisma.financialRecord.create({
    data: {
      amount,
      type,
      category,
      date: new Date(date),
      notes,
      createdBy: req.user.id
    }
  });

  res.json(record);
};


exports.getRecords = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    type,
    category,
    search,
    startDate,
    endDate
  } = req.query;

  const where = {
    isDeleted: false,
    ...(type && { type }),
    ...(category && { category }),

    // 🔍 Search (category + notes)
    ...(search && {
      OR: [
        { category: { contains: search } },
        { notes: { contains: search } }
      ]
    }),

    // 📅 Date filtering
    ...(startDate && endDate && {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate)
      }
    })
  };

  const records = await prisma.financialRecord.findMany({
    where,
    skip: (page - 1) * limit,
    take: parseInt(limit)
  });

  res.json(records);
};

exports.updateRecord = async (req, res) => {
  const id = parseInt(req.params.id);

  const record = await prisma.financialRecord.updateMany({
    where: { id, isDeleted: false },
    data: req.body
  });

//   res.json(record);
    if (record.count === 0) {
        return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Updated" });
};

exports.deleteRecord = async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.financialRecord.update({
    where: { id },
    data: { isDeleted: true }
});

  res.json({ message: "Deleted" });
};