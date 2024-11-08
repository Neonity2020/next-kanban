import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Task } from "@/types/kanban"
import { useState, useEffect } from "react"

type Priority = 'low' | 'medium' | 'high';

interface TaskDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  task?: Task
  onSave: (task: Partial<Task>) => void
}

export function TaskDialog({ open, onOpenChange, task, onSave }: TaskDialogProps) {
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    status: 'todo'
  })

  useEffect(() => {
    if (task) {
      setFormData(task)
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium' as Priority,
        status: 'todo'
      })
    }
  }, [task, open])

  return (
    <Dialog 
      open={open} 
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          setFormData({
            title: '',
            description: '',
            priority: 'medium' as Priority,
            status: 'todo'
          })
        }
        onOpenChange(isOpen)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? '编辑任务' : '新建任务'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">标题</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">描述</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
          <div>
            <label className="text-sm font-medium">优先级</label>
            <Select
              value={formData.priority}
              onValueChange={(value: Priority) => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">低优先级</SelectItem>
                <SelectItem value="medium">中优先级</SelectItem>
                <SelectItem value="high">高优先级</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            取消
          </Button>
          <Button onClick={() => {
            onSave(formData)
            onOpenChange(false)
          }}>
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 