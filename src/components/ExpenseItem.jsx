export default function ExpenseItem({ expense, onDelete, categories }) {
  const cat = categories.find((c) => c.value === expense.category) || categories[categories.length - 1];

  return (
    <li className="expense-item animate-in">
      <div className="expense-info">
        <span className={`category-badge category--${expense.category}`}>
          {cat.emoji}
        </span>
        <span className="expense-name">{expense.name}</span>
      </div>
      <div className="expense-actions">
        <span className="expense-amount">${expense.amount.toFixed(2)}</span>
        <button
          className="btn-delete"
          onClick={() => onDelete(expense.id)}
          aria-label={`Delete ${expense.name}`}
          data-id={expense.id}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          </svg>
        </button>
      </div>
    </li>
  );
}
