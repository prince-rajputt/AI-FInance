"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Generate unique transaction ID
function generateTransactionId() {
  return `TXN${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
}

export async function transferMoney(data) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const { fromAccountId, toAccountId, amount, description, toPhoneOrEmail } = data;

    // Validate amount
    const transferAmount = parseFloat(amount);
    if (transferAmount <= 0) throw new Error("Amount must be greater than 0");

    // Get from account
    const fromAccount = await db.account.findUnique({
      where: { id: fromAccountId, userId: user.id },
    });

    if (!fromAccount) throw new Error("Source account not found");

    if (fromAccount.balance < transferAmount) {
      throw new Error("Insufficient balance");
    }

    let toAccount = null;

    // If toAccountId is provided, it's internal transfer
    if (toAccountId) {
      toAccount = await db.account.findUnique({
        where: { id: toAccountId, userId: user.id },
      });

      if (!toAccount) throw new Error("Destination account not found");
    }

    // Generate transaction ID
    const transactionId = generateTransactionId();

    // Create transactions using database transaction
    const result = await db.$transaction(async (tx) => {
      // Debit from source account
      const debitTx = await tx.transaction.create({
        data: {
          userId: user.id,
          accountId: fromAccountId,
          type: "EXPENSE",
          amount: transferAmount,
          category: "transfer",
          description: toAccountId
            ? `Transfer to ${toAccount.name}`
            : `Transfer to ${toPhoneOrEmail}`,
          date: new Date(),
          isRecurring: false,
          recurringInterval: null,
          transactionId: transactionId,
        },
      });

      // Update from account balance
      await tx.account.update({
        where: { id: fromAccountId },
        data: {
          balance: fromAccount.balance - transferAmount,
        },
      });

      // If internal transfer, credit to destination account
      if (toAccount) {
        const creditTx = await tx.transaction.create({
          data: {
            userId: user.id,
            accountId: toAccountId,
            type: "INCOME",
            amount: transferAmount,
            category: "transfer",
            description: `Transfer from ${fromAccount.name}`,
            date: new Date(),
            isRecurring: false,
            recurringInterval: null,
            transactionId: null,
          },
        });

        // Update to account balance
        await tx.account.update({
          where: { id: toAccountId },
          data: {
            balance: { increment: transferAmount },
          },
        });

        return {
          success: true,
          transactionId,
          type: "internal",
          message: "Transfer completed successfully",
          fromAccount: {
            name: fromAccount.name,
            newBalance: fromAccount.balance - transferAmount,
          },
          toAccount: {
            name: toAccount.name,
            newBalance: parseFloat(toAccount.balance) + transferAmount,
          },
        };
      } else {
        // External transfer - just create debit entry
        return {
          success: true,
          transactionId,
          type: "external",
          message: `Transfer initiated to ${toPhoneOrEmail}`,
          fromAccount: {
            name: fromAccount.name,
            newBalance: fromAccount.balance - transferAmount,
          },
          recipient: toPhoneOrEmail,
        };
      }
    });

    revalidatePath("/dashboard");
    revalidatePath("/account");
    return result;
  } catch (error) {
    console.error("Transfer error:", error);
    throw new Error(error.message);
  }
}

export async function getUserAccounts() {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const accounts = await db.account.findMany({
      where: { userId: user.id },
      orderBy: { isDefault: "desc" },
    });

    return accounts.map((acc) => ({
      ...acc,
      balance: acc.balance.toString(),
    }));
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
}

export async function getTransactionHistory(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const transactions = await db.transaction.findMany({
      where: {
        userId: user.id,
        accountId,
      },
      orderBy: { date: "desc" },
      take: 10,
    });

    return transactions.map((tx) => ({
      ...tx,
      amount: tx.amount.toString(),
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function verifyPhoneOrEmail(phoneOrEmail) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    // Simulate phone/email verification
    // In real app, you'd check if recipient exists in system
    const isValid = /^[\w.-]+@[\w.-]+\.\w+$/.test(phoneOrEmail) || 
                    /^\d{10}$/.test(phoneOrEmail);

    return {
      valid: isValid,
      type: /^\d{10}$/.test(phoneOrEmail) ? "phone" : "email",
      recipient: phoneOrEmail,
    };
  } catch (error) {
    console.error("Verification error:", error);
    throw error;
  }
}
