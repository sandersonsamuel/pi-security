// Tipos para os funcionários
export interface Employee {
  id: number
  cpf: string
  name: string
  position: string
  department: string
  hobbies: string[]
  birthdate: string
  pet?: string
  favoriteTeam?: string
  childName?: string
  spouseName?: string
  password: string
  difficulty: "Fácil" | "Médio" | "Difícil"
}

// Tipos para os riscos cibernéticos
export interface CyberRisk {
  id: number
  title: string
  description: string
  howItWorks: string
  howToProtect: string
}

// Tipos para as mensagens de feedback
export interface FeedbackMessage {
  type: "error" | "success" | "warning" | "info"
  text: string
}
