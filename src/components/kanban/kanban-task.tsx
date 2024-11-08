'use client'

import { Draggable } from "@hello-pangea/dnd"
import { Task } from "@/types/kanban"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface KanbanTaskProps {
  task: Task
  index: number
  onEdit?: (task: Task) => void
  onDelete?: (taskId: string) => void
}

export function KanbanTask({ task, index, onEdit, onDelete }: KanbanTaskProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card className="group hover-card">
            <CardHeader className="p-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{task.title}</CardTitle>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => onEdit?.(task)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDelete?.(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardDescription className="text-xs mt-1">
                创建于 {formatDate(task.createdAt)}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-sm text-muted-foreground">{task.description}</p>
              {task.priority && mounted && (
                <div className="mt-2">
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full",
                    {
                      'bg-red-100 text-red-800': task.priority === 'high',
                      'bg-yellow-100 text-yellow-800': task.priority === 'medium',
                      'bg-green-100 text-green-800': task.priority === 'low',
                    }
                  )}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  )
}

function getPriorityLabel(priority: string) {
  const labels = {
    high: '高优先级',
    medium: '中优先级',
    low: '低优先级'
  }
  return labels[priority as keyof typeof labels] || ''
} 