import { KanbanBoard } from "@/components/kanban/kanban-board"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">我的看板</h1>
        <ThemeToggle />
      </div>
      <KanbanBoard />
    </div>
  )
}
