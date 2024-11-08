export type TaskStatus = "todo" | "in-progress" | "done"

export interface Task {
  id: string
  content: string
  title: string
  description?: string
  status: TaskStatus
  priority?: "low" | "medium" | "high"
  createdAt: Date
}

export interface Column {
  id: TaskStatus
  title: string
  tasks: Task[]
} 