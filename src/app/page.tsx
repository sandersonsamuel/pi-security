import { GameInfos } from "@/components/game-infos";
import { HowToProtect } from "@/components/how-protect";
import { Resume } from "@/components/resume";
import { Risks } from "@/components/risks";

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-10">
      <Resume/>
      <Risks/>
      <HowToProtect/>
      <GameInfos/>
    </div>
  );
}
