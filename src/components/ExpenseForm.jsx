import { useState } from 'react';

export default function ExpenseForm({ onAdd, categories }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('other');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const parsedAmount = parseFloat(amount);
    if (trimmedName && !isNaN(parsedAmount) && parsedAmount > 0) {
      onAdd(trimmedName, parsedAmount, category);
      setName('');
      setAmount('');
      setCategory('other');
    }
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="input-group">
          <label htmlFor="expense-name">Expense Name</label>
          <input
            type="text"
            id="expense-name"
            placeholder="e.g. Grocery shopping"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="expense-amount">Amount ($)</label>
          <input
            type="number"
            id="expense-amount"
            placeholder="0.00"
            step="0.01"
            min="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="form-row form-row--bottom">
        <div className="input-group">
          <label htmlFor="expense-category">Category</label>
          <select
            id="expense-category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.emoji} {cat.label}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn-add" id="add-expense-btn">
          <span className="btn-icon">+</span>
          Add Expense
        </button>
      </div>
    </form>
  );
}
