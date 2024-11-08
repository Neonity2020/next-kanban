'use client'

import { DroppableProvided } from "@hello-pangea/dnd"
import { Column, Task } from "@/types/kanban"
import { Card } from "@/components/ui/card"
import { KanbanTask } from "@/components/kanban/kanban-task"

interface KanbanColumnProps {
  column: Column
  provided: DroppableProvided
  onEditTask?: (task: Task) => void
  onDeleteTask?: (taskId: string) => void
}

export function KanbanColumn({ 
  column, 
  provided, 
  onEditTask, 
  onDeleteTask 
}: KanbanColumnProps) {
  return (
    <Card className="p-4 bg-column">
      <h3 className="font-medium mb-4">{column.title}</h3>
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className="space-y-4"
      >
        {column.tasks.map((task, index) => (
          <KanbanTask 
            key={task.id} 
            task={task} 
            index={index}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
        {provided.placeholder}
      </div>
    </Card>
  )
} 