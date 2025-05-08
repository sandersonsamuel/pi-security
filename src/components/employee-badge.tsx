"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Briefcase, Cake, Heart } from "lucide-react"
import type { Employee } from "@/lib/types"

interface EmployeeBadgeProps {
  employee: Employee
  onClick: () => void
}

export function EmployeeBadge({ employee, onClick }: EmployeeBadgeProps) {
  return (
    <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300" onClick={onClick}>
      <div className="bg-blue-600 p-4 text-white">
        <h3 className="text-xl font-bold">{employee.name}</h3>
        <p className="text-sm opacity-80">{employee.cpf}</p>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3 mt-2">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Cargo: {employee.position}</span>
          </div>

          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Departamento: {employee.department}</span>
          </div>

          <div className="flex items-center gap-2">
            <Cake className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Nascimento: {formatDate(employee.birthdate)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Heart className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Hobbies:</span>
            <div className="flex flex-wrap gap-1">
              {employee.hobbies.map((hobby, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {hobby}
                </Badge>
              ))}
            </div>
          </div>

          {employee.pet && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">🐾 Pet: {employee.pet}</span>
            </div>
          )}

          {employee.favoriteTeam && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">⚽ Time: {employee.favoriteTeam}</span>
            </div>
          )}

          {employee.childName && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">👶 Filho(a): {employee.childName}</span>
            </div>
          )}

          {employee.spouseName && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">💍 Cônjuge: {employee.spouseName}</span>
            </div>
          )}

          <div className="mt-4 text-right">
            <Badge variant="secondary">Dificuldade: {employee.difficulty}</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString("pt-BR")
}
