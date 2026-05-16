import { format, isToday, isTomorrow, isPast, differenceInDays } from 'date-fns'

export const formatDate = (date) => {
  if (!date) return ''
  return format(new Date(date), 'MMM dd, yyyy')
}

export const formatDateTime = (date) => {
  if (!date) return ''
  return format(new Date(date), 'MMM dd, yyyy h:mm a')
}

export const getDueDateStatus = (dueDate) => {
  if (!dueDate) return null
  
  const date = new Date(dueDate)
  
  if (isToday(date)) return { label: 'Today', className: 'text-orange-500' }
  if (isTomorrow(date)) return { label: 'Tomorrow', className: 'text-blue-500' }
  if (isPast(date) && !isToday(date)) return { label: 'Overdue', className: 'text-red-500' }
  
  const daysLeft = differenceInDays(date, new Date())
  return { label: `${daysLeft} days left`, className: 'text-green-500' }
}