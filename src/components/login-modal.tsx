"use client";

import type React from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Employee, FeedbackMessage } from "@/lib/types";
import {
  AlertCircle,
  Briefcase,
  Cake,
  CheckCircle2,
  Eye,
  EyeOff,
  Heart,
  Lock,
  User,
} from "lucide-react";
import { useState } from "react";
import { formatDate } from "./employee-badge";
import { Badge } from "./ui/badge";

interface LoginModalProps {
  employee: Employee;
  onClose: () => void;
  onSuccess: () => void;
  onFailure: () => void;
  successfulHacks: number[];
}

export function LoginModal({
  employee,
  onClose,
  onSuccess,
  onFailure,
  successfulHacks,
}: LoginModalProps) {
  const [password, setPassword] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState<FeedbackMessage | null>(null);
  const [success, setSuccess] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password === employee.password) {
      setSuccess(true);
      setMessage({
        type: "success",
        text: "Acesso concedido! Você conseguiu hackear esta conta.",
      });

      setTimeout(() => {
        onSuccess();
      }, 2000);
    } else {
      setAttempts(attempts + 1);
      setMessage({
        type: "error",
        text: `Senha incorreta. Tentativa ${attempts + 1} de 3.`,
      });

      if (attempts >= 2) {
        setGameOver(true);
        onFailure();
      }
    }
  };

  if (gameOver) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Você foi descoberto!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Você não conseguiu hackear a conta de {employee.name}.</p>
            <p>
              Você hackeou {successfulHacks.length} de {3} contas.
            </p>
          </div>
          <DialogFooter>
            <Button
              type="button"
              onClick={onClose}
              className="w-full text-sm bg-primary text-primary-foreground"
            >
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
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
            <p>
              As pessoas frequentemente usam informações pessoais em suas
              senhas.
            </p>
            <p>
              Tente combinar hobbies, datas de nascimento ou nomes de
              pessoas/pets importantes.
            </p>
          </div>

          <div className="space-y-3 mt-2">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">
                Cargo: {employee.position}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">
                Departamento: {employee.department}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Cake className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">
                Nascimento: {formatDate(employee.birthdate)}
              </span>
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
                <span className="text-sm font-medium">
                  🐾 Pet: {employee.pet}
                </span>
              </div>
            )}

            {employee.favoriteTeam && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  ⚽ Time: {employee.favoriteTeam}
                </span>
              </div>
            )}

            {employee.childName && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  👶 Filho(a): {employee.childName}
                </span>
              </div>
            )}

            {employee.spouseName && (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">
                  💍 Cônjuge: {employee.spouseName}
                </span>
              </div>
            )}

            <div className="mt-4 text-right">
              <Badge variant="secondary">
                Dificuldade: {employee.difficulty}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="username">Usuário</Label>
            <Input
              id="username"
              value={employee.name.toLowerCase().replace(" ", ".")}
              disabled
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha para hackear"
                disabled={success}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                disabled={success}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
                <span className="sr-only">
                  {showPassword ? "Ocultar senha" : "Mostrar senha"}
                </span>
              </Button>
            </div>
          </div>

          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className="py-2"
            >
              <AlertDescription className="flex items-center gap-2">
                {message.type === "error" ? (
                  <AlertCircle className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          <DialogFooter>
            <Button
              type="submit"
              disabled={success}
              className="w-full text-sm bg-primary text-primary-foreground"
            >
              {success ? "Hackeado com Sucesso!" : "Tentar Hackear"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
