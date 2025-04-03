export const Resume = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-6xl text-center font-bold">
        <h1 className="text-primary">Hackeando a Mente:</h1>
        <h1 className="bg-primary text-secondary block">O Desafio das Senhas</h1>
      </div>

      <div className="text-xl mt-5 w-4xl text-justify space-y-2 indent-15">
        <h3>
          No mundo digital, senhas são como chaves que protegem nossas
          informações mais valiosas. Mas você sabia que muitas senhas podem ser
          adivinhadas em segundos por hackers?
        </h3>

        <h3>
          Neste jogo, você vai se colocar no lugar de um hacker e aprender como
          eles descobrem senhas. Mas atenção: o objetivo aqui é conscientizar,
          não incentivar práticas maliciosas. No final, você vai aprender a se
          proteger!
        </h3>
      </div>
    </div>
  );
};
