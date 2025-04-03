"use client";

import data from "../../../data.json";

const GamePage = () => {
  return (
    <div className="sectionContent">
      <h2 className="sectionTitle">Selecione uma pessoa para hackear</h2>
      <h3 className="mt-3 w-4xl text-justify indent-15 text-lg">
        Você é um hacker que conseguiu invadir o sistema de uma grande loja e
        obteve acesso às informações de alguns funcionários. Agora, sua missão é
        usar essas informações para tentar adivinhar as senhas deles. Escolha
        uma pessoa na lista abaixo para ver detalhes como hobbies, datas
        importantes e outras pistas. Com base nesses dados, tente descobrir a
        senha do banco dela.
      </h3>

      <div className="flex gap-5 mt-3 justify-between">
        {data.employees.map((employee) => (
          <img src="hyuj" alt="" />
        ))}
      </div>
    </div>
  );
};

export default GamePage;
