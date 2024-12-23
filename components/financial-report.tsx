"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { DollarSign, TrendingUp, CreditCard } from 'lucide-react'

interface Expense {
  id: string
  amount: number
  category: string
  date: Date
  description: string
}

interface FinancialReportProps {
  expenses: Expense[]
}

export function FinancialReport({ expenses }: FinancialReportProps) {
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0)
  
  const expensesByCategory = expenses.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = 0
    }
    acc[curr.category] += curr.amount
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
  }))

  const statsCards = [
    {
      title: "Total Expenses",
      value: totalExpenses.toFixed(2),
      icon: DollarSign,
      description: "Total amount spent",
    },
    {
      title: "Average Expense",
      value: (totalExpenses / expenses.length || 0).toFixed(2),
      icon: TrendingUp,
      description: "Average amount per expense",
    },
    {
      title: "Categories",
      value: Object.keys(expensesByCategory).length,
      icon: CreditCard,
      description: "Number of expense categories",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {statsCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="backdrop-blur-sm bg-black/50 border-none shadow-2xl overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white">
                  {card.title}
                </CardTitle>
                <card.icon className="h-4 w-4 text-pink-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-pink-200">
                  {card.title.includes("Categories") ? card.value : `₹${card.value}`}
                </div>
                <p className="text-xs text-white/60">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="backdrop-blur-sm bg-black/50 border-none shadow-2xl">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-pink-200">
              Expenses by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                amount: {
                  label: "Amount (₹)",
                  color: "hsl(var(--primary))",
                },
              }}
              className="h-[400px] mt-4"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                  <XAxis
                    dataKey="category"
                    angle={-45}
                    textAnchor="end"
                    height={60}
                    tick={{ fill: 'white' }}
                  />
                  <YAxis
                    tickFormatter={(value) => `₹${value}`}
                    tick={{ fill: 'white' }}
                  />
                  <ChartTooltip
                    content={
                      <ChartTooltipContent
                        formatter={(value) => (
                          <div className="flex items-center gap-2">
                            <span className="font-medium">₹{Number(value).toFixed(2)}</span>
                          </div>
                        )}
                      />
                    }
                  />
                  <Bar
                    dataKey="amount"
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={50}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(129, 140, 248)" />
                      <stop offset="100%" stopColor="rgb(236, 72, 153)" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

