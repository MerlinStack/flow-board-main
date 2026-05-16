export default function EmptyState({ message, action }) {
  return (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📋</div>
      <p className="text-gray-500 dark:text-gray-400 mb-4">{message}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary">
          {action.label}
        </button>
      )}
    </div>
  )
}