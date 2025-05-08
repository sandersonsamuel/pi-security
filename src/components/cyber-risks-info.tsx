import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ShieldAlert, AlertTriangle, Info } from "lucide-react";
import { CyberRisk } from "@/lib/types";

interface CyberRisksInfoProps {
  risks: CyberRisk[];
}

export function CyberRisksInfo({ risks }: CyberRisksInfoProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert className="h-8 w-8 text-red-600" />
        <h2 className="text-2xl font-bold">Riscos Cibernéticos</h2>
      </div>

      <p className="text-muted-foreground mb-6">
        Conheça os principais riscos de segurança cibernética e como se proteger
        deles. Estas informações podem ajudar você a entender como os hackers
        podem explorar vulnerabilidades.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {risks.map((risk) => (
          <Card key={risk.id}>
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <CardTitle>{risk.title}</CardTitle>
              </div>
              <CardDescription>{risk.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="how-it-works">
                  <AccordionTrigger className="text-sm font-medium">
                    Como funciona
                  </AccordionTrigger>
                  <AccordionContent>{risk.howItWorks}</AccordionContent>
                </AccordionItem>
                <AccordionItem value="how-to-protect">
                  <AccordionTrigger className="text-sm font-medium">
                    Como se proteger
                  </AccordionTrigger>
                  <AccordionContent>{risk.howToProtect}</AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-blue-50 border-blue-200">
        <CardContent>
          <div className="flex items-start gap-3">
            <div>
              <h3 className="font-bold text-blue-800 mb-2">Dica para o jogo</h3>
              <p className="text-blue-700">
                Observe como as senhas fracas geralmente contêm informações
                pessoais facilmente descobertas, como hobbies, datas de
                nascimento ou nomes de pessoas próximas. No desafio, tente
                combinar essas informações para descobrir as senhas dos
                funcionários.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
