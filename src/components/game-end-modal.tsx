"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trophy, RotateCcw } from "lucide-react";

interface Medal {
  id: number;
  name: string;
  icon: string;
  threshold: number;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface GameEndModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  medal: Medal | null;
  successfulHacks: number;
  totalEmployees: number;
}

export function GameEndModal({
  isOpen,
  onClose,
  onRestart,
  medal,
  successfulHacks,
  totalEmployees,
}: GameEndModalProps) {
  const progressPercentage = (successfulHacks / totalEmployees) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center gap-2 text-2xl">
            <Trophy className="h-6 w-6 text-yellow-600" />
            Jogo Finalizado!
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Sua Performance:</h3>
            <p className="text-3xl font-bold text-green-600 mb-2">
              {successfulHacks} de {totalEmployees}
            </p>
            <p className="text-sm text-gray-600">
              contas hackeadas ({Math.round(progressPercentage)}%)
            </p>
          </div>

          {medal && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">
                Medalha Conquistada:
              </h3>
              <div className="flex flex-col items-center">
                <div
                  className={`w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${medal.bgColor} ${medal.borderColor} shadow-lg`}
                >
                  <Image
                    src={medal.icon || "/placeholder.svg"}
                    alt={medal.name}
                    width={500}
                    height={500}
                    className="w-24 h-24"
                  />
                </div>
                <div className="text-center mt-4">
                  <p className="text-xl font-bold text-gray-800">
                    {medal.name}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Parabéns pela conquista!
                  </p>
                </div>
              </div>
            </div>
          )}

          {!medal && (
            <div className="mb-6">
              <div className="w-32 h-32 rounded-full border-4 border-gray-300 bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-16 h-16 text-gray-400" />
              </div>
              <p className="text-lg font-semibold text-gray-600">
                Continue tentando para conquistar uma medalha!
              </p>
            </div>
          )}

          <div className="space-y-3">
            <Button onClick={onRestart} className="w-full" size="lg">
              <RotateCcw className="w-4 h-4 mr-2" />
              Jogar Novamente
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
