'use client'

import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd"
import { useState } from "react"
import { Column, Task, TaskStatus } from "@/types/kanban"
import { KanbanColumn } from "./kanban-column"
import { TaskDialog } from "./task-dialog"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { v4 as uuidv4 } from 'uuid'
import { useLocalStorage } from "@/hooks/use-local-storage"

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "待办事项",
    tasks: [
      {
        id: "1",
        title: "学习 Next.js",
        description: "完成看板项目",
        content: "完成看板项目",
        status: "todo",
        createdAt: new Date('2024-01-01T00:00:00.000Z'),
      },
    ],
  },
  {
    id: "in-progress",
    title: "进行中",
    tasks: [],
  },
  {
    id: "done",
    title: "已完成",
    tasks: [],
  },
]

export function KanbanBoard() {
  const [columns, setColumns] = useLocalStorage<Column[]>("kanban-columns", initialColumns)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | undefined>()

  const handleAddTask = () => {
    setEditingTask(undefined)
    setDialogOpen(true)
  }

  const handleEditTask = (task: Task) => {
    setEditingTask(task)
    setDialogOpen(true)
  }

  const handleDeleteTask = (taskId: string) => {
    const newColumns = columns.map(column => ({
      ...column,
      tasks: column.tasks.filter(task => task.id !== taskId)
    }))
    setColumns(newColumns)
  }

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (editingTask) {
      // 编辑现有任务
      const newColumns = columns.map(column => ({
        ...column,
        tasks: column.tasks.map(task => 
          task.id === editingTask.id 
            ? { ...task, ...taskData }
            : task
        )
      }))
      setColumns(newColumns)
    } else {
      // 创建新任务
      const newTask: Task = {
        id: uuidv4(),
        title: taskData.title || '',
        content: taskData.description || '',
        description: taskData.description || '',
        status: 'todo',
        priority: taskData.priority,
        createdAt: new Date(),
      }
      
      const newColumns = columns.map(column => 
        column.id === 'todo'
          ? { ...column, tasks: [...column.tasks, newTask] }
          : column
      )
      setColumns(newColumns)
    }
    setDialogOpen(false)
    setEditingTask(undefined)
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination || 
        (destination.droppableId === source.droppableId && 
         destination.index === source.index)) {
      return
    }

    const newColumns = [...columns]
    const sourceCol = newColumns.find(col => col.id === source.droppableId)
    const destCol = newColumns.find(col => col.id === destination.droppableId)

    if (!sourceCol || !destCol) return

    const [movedTask] = sourceCol.tasks.splice(source.index, 1)
    movedTask.status = destination.droppableId as TaskStatus
    destCol.tasks.splice(destination.index, 0, movedTask)

    setColumns(newColumns)
  }

  return (
    <>
      <div className="mb-4">
        <Button onClick={handleAddTask}>
          <Plus className="w-4 h-4 mr-2" />
          添加任务
        </Button>
      </div>
      
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {columns.map((column) => (
            <div key={column.id} className="flex-1">
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <KanbanColumn
                    column={column}
                    provided={provided}
                    onEditTask={handleEditTask}
                    onDeleteTask={handleDeleteTask}
                  />
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <TaskDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </>
  )
} 