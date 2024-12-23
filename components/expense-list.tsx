"use client"

import { motion, AnimatePresence } from "framer-motion"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from 'lucide-react'
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Expense {
  id: string
  amount: number
  category: string
  date: Date
  description: string
}

interface ExpenseListProps {
  expenses: Expense[]
  onEdit: (expense: Expense) => void
  onDelete: (id: string) => void
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  return (
    <Card className="backdrop-blur-sm bg-black/50 border-none shadow-2xl">
      <CardHeader>
        <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-pink-200">
          Recent Expenses
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-white/20">
          <Table>
            <TableHeader>
              <TableRow className="border-white/20">
                <TableHead className="text-white">Date</TableHead>
                <TableHead className="text-white">Category</TableHead>
                <TableHead className="text-white">Description</TableHead>
                <TableHead className="text-right text-white">Amount</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {expenses.map((expense, index) => (
                  <motion.tr
                    key={expense.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="group hover:bg-white/5 border-white/20"
                  >
                    <TableCell className="text-white/80">{format(expense.date, "PP")}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-gradient-to-r from-indigo-500/20 to-pink-500/20 text-white">
                        {expense.category}
                      </span>
                    </TableCell>
                    <TableCell className="text-white/80">{expense.description}</TableCell>
                    <TableCell className="text-right font-medium text-white">
                      ₹{expense.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(expense)}
                          className="h-8 w-8 hover:text-indigo-400 text-white/80"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(expense.id)}
                          className="h-8 w-8 hover:text-pink-400 text-white/80"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

