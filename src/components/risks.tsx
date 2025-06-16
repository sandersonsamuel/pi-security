"use client";

import { useState } from "react";
import data from "../../data.json";
import { Button } from "./ui/button";
import classNames from "classnames";

const cyberRisks = data.cyberRisks;

export const Risks = () => {
  const [riskSelected, setRiskSelected] = useState<number>(1);
  const risk = cyberRisks[riskSelected - 1];

  return (
    <div className="sectionContent">
      <div className=" lg:min-w-[700px] w-[700px]">
        <h2 className="sectionTitle">Riscos Cibernéticos</h2>

        <div className="flex gap-5 mt-3 justify-between">
          {cyberRisks.map((risk) => (
            <Button
              onClick={() => setRiskSelected(risk.id)}
              onMouseEnter={() => setRiskSelected(risk.id)}
              className={classNames(
                "cursor-pointer transition-colors duration-200",
                risk.id === riskSelected
                  ? "bg-secondary ring ring-primary"
                  : "bg-primary text-secondary"
              )}
              key={risk.id}
            >
              {risk.title}
            </Button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-2 text-justify w-4xl text-lg">
        <span>
          <u className="text-xl">O que é? </u>
          <h3>{risk.description}</h3>
        </span>
        <span>
          <u className="text-xl">Como funciona? </u>
          <h3>{risk.howItWorks}</h3>
        </span>
        <span>
          <u className="text-xl">Como proteger? </u>
          <h3>{risk.howToProtect}</h3>
        </span>
      </div>
    </div>
  );
};
