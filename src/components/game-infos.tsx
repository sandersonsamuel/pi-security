import Link from "next/link";
import { Button } from "./ui/button";

export const GameInfos = () => {
  return (
    <div className="sectionContent">
      <h2 className="sectionTitle">Como funciona o jogo?</h2>

      <h3 className="mt-3 max-w-4xl text-lg indent-15">
        No jogo, você vai simular um hacker tentando adivinhar a senha de alguém
        com base nas informações disponíveis. Use as técnicas que acabou de
        aprender para pensar como um hacker e descobrir a senha.
      </h3>

      <Link href={'/game'}>
        <Button className="bg-primary text-secondary cursor-pointer">
          Quero jogar
        </Button>
      </Link>
    </div>
  );
};
