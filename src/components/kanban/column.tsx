interface ColumnProps {
  title: string
}

export function Column({ title }: ColumnProps) {
  return (
    <div className="w-72 bg-gray-100 rounded-lg p-4">
      <h3 className="font-medium mb-4">{title}</h3>
    </div>
  )
} 