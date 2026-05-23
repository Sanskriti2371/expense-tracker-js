import ExpenseItem from './ExpenseItem';

export default function ExpenseList({ expenses, onDelete, categories }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
            <rect x="2" y="5" width="20" height="14" rx="2" />
            <line x1="2" y1="10" x2="22" y2="10" />
          </svg>
        </div>
        <p className="empty-title">No expenses yet</p>
        <p className="empty-subtitle">Add your first expense to start tracking!</p>
      </div>
    );
  }

  return (
    <ul className="expense-list" id="expense-list">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          categories={categories}
        />
      ))}
    </ul>
  );
}
