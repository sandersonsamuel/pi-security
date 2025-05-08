"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Lock, AlertCircle, CheckCircle2 } from "lucide-react"
import type { Employee, FeedbackMessage } from "@/lib/types"

interface LoginModalProps {
  employee: Employee
  onClose: () => void
  onSuccess: () => void
}

export function LoginModal({ employee, onClose, onSuccess }: LoginModalProps) {
  const [password, setPassword] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [message, setMessage] = useState<FeedbackMessage | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (password === employee.password) {
      setSuccess(true)
      setMessage({
        type: "success",
        text: "Acesso concedido! Você conseguiu hackear esta conta.",
      })

      setTimeout(() => {
        onSuccess()
      }, 2000)
    } else {
      setAttempts(attempts + 1)
      setMessage({
        type: "error",
        text: `Senha incorreta. Tentativa ${attempts + 1} de 3.`,
      })

      if (attempts >= 2) {
        setTimeout(() => {
          onClose()
        }, 2000)
      }
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Hackear conta de {employee.name}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-slate-100 p-3 rounded-md text-sm">
            <p className="font-medium">Dica:</p>
            <p>As pessoas frequentemente usam informações pessoais em suas senhas.</p>
            <p>Tente combinar hobbies, datas de nascimento ou nomes de pessoas/pets importantes.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input id="username" value={employee.name.toLowerCase().replace(" ", ".")} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha para hackear"
              disabled={success}
            />
          </div>

          {message && (
            <Alert variant={message.type === "error" ? "destructive" : "default"} className="py-2">
              <AlertDescription className="flex items-center gap-2">
                {message.type === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button type="submit" disabled={success} className="w-full text-sm bg-primary text-primary-foreground">
              {success ? "Hackeado com Sucesso!" : "Tentar Hackear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
