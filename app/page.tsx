/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"
import { FinancialReport } from "@/components/financial-report"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { Coins, TrendingUp, Wallet } from 'lucide-react'

interface Expense {
  id: string
  amount: number
  category: string
  date: Date
  description: string
}

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  const handleAddExpense = (data: any) => {
    const newExpense = {
      id: Math.random().toString(36).substr(2, 9),
      amount: parseFloat(data.amount),
      category: data.category,
      date: data.date,
      description: data.description,
    }
    setExpenses([...expenses, newExpense])
    toast({
      title: "Expense Added",
      description: "Your expense has been successfully added.",
    })
  }

  const handleEditExpense = (expense: Expense) => {
    // Implement edit functionality
    console.log("Edit expense:", expense)
    toast({
      title: "Edit Expense",
      description: "Edit functionality coming soon!",
    })
  }

  const handleDeleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
    toast({
      title: "Expense Deleted",
      description: "Your expense has been successfully deleted.",
      variant: "destructive",
    })
  }

  useEffect(() => {
    // Simulate fetching data from an API
    const timeout = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Coins className="h-16 w-16 text-white" />
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[url('/abstract-bg.svg')] bg-cover bg-center bg-no-repeat">
      <div className="min-h-screen backdrop-blur-sm bg-gradient-to-br from-indigo-600/30 via-purple-600/30 to-pink-500/30">
        <div className="container mx-auto py-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
                className="flex items-center justify-center mb-4"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur-xl opacity-50" />
                <div className="relative bg-black/50 p-6 rounded-lg backdrop-blur-sm">
                  <Wallet className="h-16 w-16 text-white mb-4" />
                  <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
                    Personal Finance Tracker
                  </h1>
                </div>
              </motion.div>
              <p className="text-white/80 max-w-2xl mx-auto text-lg">
                Track your expenses, analyze spending patterns, and take control of your financial future
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Tabs defaultValue="expenses" className="space-y-8">
              <TabsList className="w-full max-w-md mx-auto grid grid-cols-2 h-16 bg-black/50 backdrop-blur-sm p-1 rounded-lg">
                <TabsTrigger 
                  value="expenses" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 rounded-md"
                >
                  <Coins className="mr-2 h-4 w-4" />
                  Expenses
                </TabsTrigger>
                <TabsTrigger 
                  value="report" 
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300 rounded-md"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Reports
                </TabsTrigger>
              </TabsList>
              <AnimatePresence mode="wait">
                <TabsContent value="expenses" className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid gap-6 md:grid-cols-[400px,1fr] items-start">
                      <ExpenseForm onSubmit={handleAddExpense} />
                      <ExpenseList
                        expenses={expenses}
                        onEdit={handleEditExpense}
                        onDelete={handleDeleteExpense}
                      />
                    </div>
                  </motion.div>
                </TabsContent>
                <TabsContent value="report">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <FinancialReport expenses={expenses} />
                  </motion.div>
                </TabsContent>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

