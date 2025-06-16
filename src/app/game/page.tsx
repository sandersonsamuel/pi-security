"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { EmployeeBadge } from "@/components/employee-badge"
import { LoginModal } from "@/components/login-modal"
import { CyberRisksInfo } from "@/components/cyber-risks-info"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { employees, cyberRisks } from "../../../data.json"
import type { Employee } from "@/lib/types"
import Image from "next/image"
import { GameEndModal } from "@/components/game-end-modal"

const medals = [
  {
    id: 1,
    name: "Hacker Iniciante",
    icon: "/adesivo-bronze.png",
    threshold: 1,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-400",
  },
  {
    id: 2,
    name: "Hacker Experiente",
    icon: "/adesivo-silver.png",
    threshold: Math.ceil(employees.length * 0.5),
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-400",
  },
  {
    id: 3,
    name: "Mestre Hacker",
    icon: "/adesivo-gold.png",
    threshold: employees.length,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-400",
  },
]

export default function Home() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [successfulHacks, setSuccessfulHacks] = useState<number[]>([])
  const [gameEnded, setGameEnded] = useState(false)
  const [showGameEndModal, setShowGameEndModal] = useState(false)

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

  const handleLoginFailure = () => {
    setSelectedEmployee(null)
    setShowLoginModal(false)
    setGameEnded(true)
    setShowGameEndModal(true)
  }

  const handleRestartGame = () => {
    setSuccessfulHacks([])
    setGameEnded(false)
    setShowGameEndModal(false)
    setSelectedEmployee(null)
    setShowLoginModal(false)
  }

  const progressPercentage = (successfulHacks.length / employees.length) * 100
  const progressRatio = successfulHacks.length / employees.length

  const isUnlocked = (medal: (typeof medals)[0]) => {
    return successfulHacks.length >= medal.threshold
  }

  // Encontra a maior medalha conquistada
  const getHighestMedal = () => {
    const unlockedMedals = medals.filter((medal) => isUnlocked(medal))
    return unlockedMedals.length > 0 ? unlockedMedals[unlockedMedals.length - 1] : null
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
                <EmployeeBadge
                  employee={employee as Employee}
                  onClick={() => !gameEnded && handleEmployeeClick(employee as Employee)}
                />
                {successfulHacks.includes(employee.id) && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-xs font-bold">
                    HACKEADO
                  </div>
                )}
                {gameEnded && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">JOGO FINALIZADO</span>
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

      <div className="mt-8 p-6 bg-slate-100 rounded-lg">
        <h2 className="text-xl font-bold mb-6 text-center">Progresso do Desafio</h2>

        {/* Medalhas */}
        <div className="flex justify-center items-end mb-4 space-x-2 md:space-x-4">
          {medals.map((medal) => {
            const unlocked = isUnlocked(medal)

            return (
              <div
                key={medal.id}
                className={`flex flex-col items-center transition-all duration-500 ${
                  unlocked ? "scale-100 opacity-100" : "scale-75 opacity-40"
                }`}
              >
                <div
                  className={`rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    unlocked && `${medal.bgColor} ${medal.borderColor} shadow-lg`
                  }`}
                >
                  <Image
                    src={medal.icon || "/placeholder.svg"}
                    alt={medal.name}
                    width={500}
                    height={500}
                    className={`w-28 md:h-28 transition-colors duration-500 ${
                      unlocked ? medal.color : "text-gray-400"
                    }`}
                  />
                </div>
                <div className="text-center mt-2">
                  <p className={`text-xs font-semibold ${unlocked ? "text-gray-800" : "text-gray-500"}`}>
                    {medal.name}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Barra de Progresso */}
        <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-6 rounded-full transition-all duration-700 ease-out relative"
            style={{
              width: `${progressPercentage}%`,
            }}
          >
            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-sm font-bold text-gray-700">{Math.round(progressPercentage)}%</span>
          </div>
        </div>

        <p className="mt-4 text-center text-lg font-semibold">
          {successfulHacks.length} de {employees.length} contas hackeadas
        </p>

        {/* Próxima medalha */}
        {progressRatio < 1 && !gameEnded && (
          <div className="mt-4 text-center">
            {(() => {
              const nextMedal = medals.find((medal) => !isUnlocked(medal))
              if (nextMedal) {
                const remaining = nextMedal.threshold - successfulHacks.length

                return (
                  <p className="text-sm text-gray-600">
                    Próxima medalha: <span className="font-semibold">{nextMedal.name}</span>
                    {remaining > 0 && (
                      <span>
                        {" "}
                        - Faltam {remaining} hack{remaining > 1 ? "s" : ""}
                      </span>
                    )}
                  </p>
                )
              }
            })()}
          </div>
        )}

        {gameEnded && (
          <div className="mt-4 text-center">
            <Button onClick={() => setShowGameEndModal(true)} size="lg">
              Ver Resultado Final
            </Button>
          </div>
        )}
      </div>

      {showLoginModal && selectedEmployee && !gameEnded && (
        <LoginModal
          employee={selectedEmployee}
          onClose={() => setShowLoginModal(false)}
          onSuccess={() => handleHackSuccess(selectedEmployee.id)}
          onFailure={handleLoginFailure}
          successfulHacks={successfulHacks}
        />
      )}

      <GameEndModal
        isOpen={showGameEndModal}
        onClose={() => setShowGameEndModal(false)}
        onRestart={handleRestartGame}
        medal={getHighestMedal()}
        successfulHacks={successfulHacks.length}
        totalEmployees={employees.length}
      />
    </main>
  )
}
