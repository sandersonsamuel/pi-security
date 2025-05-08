"use client"

import { useState } from "react"
import { EmployeeBadge } from "@/components/employee-badge"
import { LoginModal } from "@/components/login-modal"
import { CyberRisksInfo } from "@/components/cyber-risks-info"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { employees, cyberRisks } from "../../../data.json"
import type { Employee } from "@/lib/types"

export default function Home() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [successfulHacks, setSuccessfulHacks] = useState<number[]>([])

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setShowLoginModal(true)
  }

  const handleHackSuccess = (employeeId: number) => {
    if (!successfulHacks.includes(employeeId)) {
      setSuccessfulHacks([...successfulHacks, employeeId])
    }
    setShowLoginModal(false)
  }

  return (
    <main className="container mx-auto px-4">
      <div className="text-white p-4 mb-8 rounded-lg bg-foreground">
        <h1 className="text-3xl font-bold text-center">Desafio de Segurança Cibernética</h1>
        <p className="text-center mt-2">
          Tente hackear as contas dos funcionários usando as informações disponíveis nos crachás
        </p>
      </div>

      <Tabs defaultValue="employees" className="mb-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="employees">Crachás dos Funcionários</TabsTrigger>
          <TabsTrigger value="risks">Riscos Cibernéticos</TabsTrigger>
        </TabsList>

        <TabsContent value="employees" className="p-4 border rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employees.map((employee) => (
              <div key={employee.id} className="relative">
                <EmployeeBadge employee={employee as Employee} onClick={() => handleEmployeeClick(employee as Employee)} />
                {successfulHacks.includes(employee.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                    HACKEADO
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="risks" className="p-4 border rounded-lg">
          <CyberRisksInfo risks={cyberRisks} />
        </TabsContent>
      </Tabs>

      <div className="mt-8 p-4 bg-slate-100 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Progresso do Desafio</h2>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(successfulHacks.length / employees.length) * 100}%` }}
          ></div>
        </div>
        <p className="mt-2 text-center">
          {successfulHacks.length} de {employees.length} contas hackeadas
        </p>
      </div>

      {showLoginModal && selectedEmployee && (
        <LoginModal
          employee={selectedEmployee}
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => handleHackSuccess(selectedEmployee.id)}
        />
      )}
    </main>
  )
}
