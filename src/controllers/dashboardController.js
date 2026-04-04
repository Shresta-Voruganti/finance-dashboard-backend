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
  try {
    const records = await prisma.financialRecord.findMany({
      where: { isDeleted: false }
    });

    // 🔹 MONTHLY
    const monthlyMap = {};

    records.forEach((r) => {
      const date = new Date(r.date);
      const key = `${date.getFullYear()}-${date.getMonth() + 1}`;

      if (!monthlyMap[key]) {
        monthlyMap[key] = { income: 0, expense: 0 };
      }

      if (r.type === "INCOME") {
        monthlyMap[key].income += r.amount;
      } else {
        monthlyMap[key].expense += r.amount;
      }
    });

    const monthly = Object.entries(monthlyMap).map(([month, data]) => ({
      month,
      ...data
    }));


    // 🔹 WEEKLY
    const weeklyMap = {};

    records.forEach((r) => {
      const date = new Date(r.date);

      const firstDay = new Date(date.getFullYear(), 0, 1);
      const pastDays = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
      const week = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);

      const key = `${date.getFullYear()}-W${week}`;

      if (!weeklyMap[key]) {
        weeklyMap[key] = { income: 0, expense: 0 };
      }

      if (r.type === "INCOME") {
        weeklyMap[key].income += r.amount;
      } else {
        weeklyMap[key].expense += r.amount;
      }
    });

    const weekly = Object.entries(weeklyMap).map(([week, data]) => ({
      week,
      ...data
    }));


    res.json({ monthly, weekly });

  } catch (error) {
    res.status(500).json({ message: "Error generating trends" });
  }
};