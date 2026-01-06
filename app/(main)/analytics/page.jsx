
import { getUserAccounts } from '@/actions/dashboard'
import { getAnalyticsData, getMonthlyComparison } from '@/actions/analytics'
import { Card, CardContent } from '@/components/ui/card'
import { SpendingTrends } from '../dashboard/_components/spending-trends'
import { IncomeVsExpense } from '../dashboard/_components/income-vs-expense'
import { CategoryBreakdown } from '../dashboard/_components/category-breakdown'
import { FinancialHealth } from '../dashboard/_components/financial-health'
import { QuickExpenseEntry } from '../dashboard/_components/quick-expense-entry'
import { SavingsGoalTracker } from '../dashboard/_components/savings-goal-tracker'
import { NetWorthAndAccounts } from '../dashboard/_components/net-worth'

async function AnalyticsPage () {
  const accounts = await getUserAccounts();
  const defaultAccount = accounts?.find((account) => account.isDefault);

  // Get analytics data
  const analytics = await getAnalyticsData(defaultAccount?.id);
  const monthlyComparison = await getMonthlyComparison();

  return (
    <div className='space-y-8'>
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Financial Analytics</h1>
          <p className="text-slate-600 mt-2">Track your spending trends, analyze financial health, and set savings goals</p>
        </div>

        {/* Quick Stats Row */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Monthly Income</p>
              <p className="text-2xl font-bold text-green-600">${analytics.monthlyIncome.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Monthly Expenses</p>
              <p className="text-2xl font-bold text-red-600">${analytics.monthlyExpenses.toFixed(2)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Net Balance</p>
              <p className={`text-2xl font-bold ${(analytics.monthlyIncome - analytics.monthlyExpenses) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ${(analytics.monthlyIncome - analytics.monthlyExpenses).toFixed(2)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="text-2xl font-bold text-blue-600">${analytics.totalBalance.toFixed(2)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <SpendingTrends data={analytics.monthlyTrend} />
          </div>
          <QuickExpenseEntry accounts={accounts} defaultAccountId={defaultAccount?.id} />
        </div>

        {/* Income vs Expense & Financial Health */}
        <div className="grid gap-4 md:grid-cols-2">
          <IncomeVsExpense 
            monthlyIncome={analytics.monthlyIncome}
            monthlyExpenses={analytics.monthlyExpenses}
            weeklyExpenses={analytics.weeklyExpenses}
            comparison={monthlyComparison}
          />
          <FinancialHealth 
            healthScore={analytics.healthScore}
            savingsRate={analytics.savingsRate}
            totalBalance={analytics.totalBalance}
            spendingGrowth={analytics.spendingGrowth}
          />
        </div>

        {/* Category & Savings */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <CategoryBreakdown topCategories={analytics.topCategories} />
          <SavingsGoalTracker 
            monthlyIncome={analytics.monthlyIncome}
            monthlyExpenses={analytics.monthlyExpenses}
            savingsRate={analytics.savingsRate}
          />
          <NetWorthAndAccounts 
            totalBalance={analytics.totalBalance}
            accountCount={analytics.accountCount}
            accounts={accounts}
          />
        </div>
    </div>
  )
}

export default AnalyticsPage
