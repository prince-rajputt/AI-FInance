"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function getAnalyticsData(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get current date info
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDay = now.getDate();

    // Month boundaries
    const monthStart = new Date(currentYear, currentMonth, 1);
    const monthEnd = new Date(currentYear, currentMonth + 1, 0);

    // Year boundaries
    const yearStart = new Date(currentYear, 0, 1);
    const yearEnd = new Date(currentYear, 11, 31);

    // Week boundaries (last 7 days)
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);

    // Get all accounts for user
    const accounts = accountId
      ? [accountId]
      : (await db.account.findMany({ where: { userId: user.id } })).map(
          (a) => a.id
        );

    // Get monthly transactions
    const monthlyTransactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        accountId: { in: accounts },
        date: { gte: monthStart, lte: monthEnd },
      },
    });

    // Get yearly transactions
    const yearlyTransactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        accountId: { in: accounts },
        date: { gte: yearStart, lte: yearEnd },
      },
    });

    // Get weekly transactions
    const weeklyTransactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        accountId: { in: accounts },
        date: { gte: weekStart, lte: now },
      },
    });

    // Calculate totals
    const monthlyExpenses = monthlyTransactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const monthlyIncome = monthlyTransactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const yearlyExpenses = yearlyTransactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const yearlyIncome = yearlyTransactions
      .filter((t) => t.type === "INCOME")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    const weeklyExpenses = weeklyTransactions
      .filter((t) => t.type === "EXPENSE")
      .reduce((sum, t) => sum + Number(t.amount), 0);

    // Category breakdown
    const categoryBreakdown = {};
    monthlyTransactions
      .filter((t) => t.type === "EXPENSE")
      .forEach((t) => {
        if (!categoryBreakdown[t.category]) {
          categoryBreakdown[t.category] = 0;
        }
        categoryBreakdown[t.category] += Number(t.amount);
      });

    // Top categories
    const topCategories = Object.entries(categoryBreakdown)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // Monthly trend (last 12 months)
    const monthlyTrend = [];
    for (let i = 11; i >= 0; i--) {
      const monthDate = new Date(currentYear, currentMonth - i, 1);
      const nextMonth = new Date(currentYear, currentMonth - i + 1, 1);

      const expenses = await db.transaction.aggregate({
        where: {
          userId: user.id,
          accountId: { in: accounts },
          type: "EXPENSE",
          date: { gte: monthDate, lt: nextMonth },
        },
        _sum: { amount: true },
      });

      const income = await db.transaction.aggregate({
        where: {
          userId: user.id,
          accountId: { in: accounts },
          type: "INCOME",
          date: { gte: monthDate, lt: nextMonth },
        },
        _sum: { amount: true },
      });

      monthlyTrend.push({
        month: monthDate.toLocaleDateString("en-US", {
          month: "short",
          year: "2-digit",
        }),
        expenses: expenses._sum.amount ? Number(expenses._sum.amount) : 0,
        income: income._sum.amount ? Number(income._sum.amount) : 0,
      });
    }

    // Get all accounts for balance summary
    const allAccounts = await db.account.findMany({
      where: { userId: user.id },
    });

    const totalBalance = allAccounts.reduce(
      (sum, acc) => sum + Number(acc.balance),
      0
    );

    // Calculate savings rate
    const savingsRate =
      monthlyIncome > 0
        ? ((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100
        : 0;

    // Financial health score (0-100)
    const healthScore = Math.min(
      100,
      Math.max(
        0,
        (savingsRate > 0 ? 50 : 0) +
          (monthlyExpenses > 0 ? 25 : 0) +
          (totalBalance > 0 ? 25 : 0)
      )
    );

    return {
      monthlyExpenses,
      monthlyIncome,
      yearlyExpenses,
      yearlyIncome,
      weeklyExpenses,
      categoryBreakdown,
      topCategories,
      monthlyTrend,
      totalBalance,
      savingsRate: Math.round(savingsRate * 100) / 100,
      healthScore: Math.round(healthScore),
      accountCount: allAccounts.length,
      spendingGrowth:
        weeklyExpenses > 0
          ? Math.round(((monthlyExpenses / 4.3 - weeklyExpenses) / weeklyExpenses) * 100)
          : 0,
    };
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
}

export async function getMonthlyComparison() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    // Current month
    const currentMonthStart = new Date(currentYear, currentMonth, 1);
    const currentMonthEnd = new Date(currentYear, currentMonth + 1, 0);

    // Previous month
    const prevMonthStart = new Date(currentYear, currentMonth - 1, 1);
    const prevMonthEnd = new Date(currentYear, currentMonth, 0);

    const currentExpenses = await db.transaction.aggregate({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: { gte: currentMonthStart, lte: currentMonthEnd },
      },
      _sum: { amount: true },
    });

    const prevExpenses = await db.transaction.aggregate({
      where: {
        userId: user.id,
        type: "EXPENSE",
        date: { gte: prevMonthStart, lte: prevMonthEnd },
      },
      _sum: { amount: true },
    });

    const current = currentExpenses._sum.amount
      ? Number(currentExpenses._sum.amount)
      : 0;
    const prev = prevExpenses._sum.amount
      ? Number(prevExpenses._sum.amount)
      : 0;
    const change = prev > 0 ? ((current - prev) / prev) * 100 : 0;

    return {
      currentMonth: current,
      previousMonth: prev,
      percentageChange: Math.round(change * 100) / 100,
      isIncrease: current > prev,
    };
  } catch (error) {
    console.error("Error fetching monthly comparison:", error);
    throw error;
  }
}
