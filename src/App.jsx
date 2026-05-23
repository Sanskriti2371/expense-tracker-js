import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import TotalDisplay from './components/TotalDisplay';
import { useExpenses } from './hooks/useExpenses';

export default function App() {
  const { expenses, total, addExpense, deleteExpense, CATEGORIES } = useExpenses();

  return (
    <div className="app-wrapper">
      {/* Ambient glow orbs */}
      <div className="orb orb--1" aria-hidden="true" />
      <div className="orb orb--2" aria-hidden="true" />
      <div className="orb orb--3" aria-hidden="true" />

      <main className="container animate-fade-in">
        <header className="app-header">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="url(#logo-gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#a855f7" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="16" />
              <line x1="8" y1="12" x2="16" y2="12" />
            </svg>
          </div>
          <h1>Expense Tracker</h1>
          <p className="subtitle">Track your spending, stay in control</p>
        </header>

        <TotalDisplay total={total} />

        <section className="card" aria-labelledby="add-expense-heading">
          <h2 id="add-expense-heading" className="section-title">
            <span className="section-icon">✏️</span>
            New Expense
          </h2>
          <ExpenseForm onAdd={addExpense} categories={CATEGORIES} />
        </section>

        <section className="card" aria-labelledby="expenses-heading">
          <h2 id="expenses-heading" className="section-title">
            <span className="section-icon">📋</span>
            Expenses
            {expenses.length > 0 && (
              <span className="expense-count">{expenses.length}</span>
            )}
          </h2>
          <ExpenseList
            expenses={expenses}
            onDelete={deleteExpense}
            categories={CATEGORIES}
          />
        </section>
      </main>
    </div>
  );
}
