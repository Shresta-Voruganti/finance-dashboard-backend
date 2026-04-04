const prisma = require("../prisma");

exports.getSummary = async (req, res) => {
  const income = await prisma.financialRecord.aggregate({
    _sum: { amount: true },
    where: { type: "INCOME" }
  });

  const expense = await prisma.financialRecord.aggregate({
    _sum: { amount: true },
    where: { type: "EXPENSE" }
  });

  res.json({
    totalIncome: income._sum.amount || 0,
    totalExpense: expense._sum.amount || 0,
    netBalance:
      (income._sum.amount || 0) - (expense._sum.amount || 0)
  });
};

exports.getCategoryBreakdown = async (req, res) => {
  const data = await prisma.financialRecord.groupBy({
    by: ["category"],
    _sum: { amount: true }
  });

  res.json(data);
};

exports.getRecent = async (req, res) => {
  const records = await prisma.financialRecord.findMany({
    orderBy: { date: "desc" },
    take: 5
  });

  res.json(records);
};

exports.getTrends = async (req, res) => {
  const data = await prisma.financialRecord.findMany();

  const trends = {};

  data.forEach((r) => {
    const month = new Date(r.date).toISOString().slice(0, 7);

    if (!trends[month]) {
      trends[month] = { income: 0, expense: 0 };
    }

    if (r.type === "INCOME") trends[month].income += r.amount;
    else trends[month].expense += r.amount;
  });

  res.json(trends);
};