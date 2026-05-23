import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'expenses';

const CATEGORIES = [
  { value: 'food', label: 'Food', emoji: '🍔' },
  { value: 'transport', label: 'Transport', emoji: '🚗' },
  { value: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { value: 'bills', label: 'Bills', emoji: '📄' },
  { value: 'other', label: 'Other', emoji: '📌' },
];

function loadExpenses() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    // Migrate old format: add category if missing
    return parsed.map((exp) => ({
      ...exp,
      category: exp.category || 'other',
    }));
  } catch {
    return [];
  }
}

export function useExpenses() {
  const [expenses, setExpenses] = useState(loadExpenses);

  // Persist to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = useCallback((name, amount, category = 'other') => {
    const newExpense = {
      id: Date.now(),
      name,
      amount: parseFloat(amount),
      category,
    };
    setExpenses((prev) => [newExpense, ...prev]);
  }, []);

  const deleteExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  }, []);

  const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  return { expenses, total, addExpense, deleteExpense, CATEGORIES };
}
