export const medals = [
  {
    id: 1,
    name: "Hacker Iniciante",
    icon: "/adesivo-bronze.png",
    threshold: 1,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-400",
  },
  {
    id: 2,
    name: "Hacker Experiente",
    icon: "/adesivo-silver.png",
    threshold: Math.ceil(employees.length * 0.5),
    color: "text-yellow-600",
    bgColor: "bg-yellow-100",
    borderColor: "border-yellow-400",
  },
  {
    id: 3,
    name: "Mestre Hacker",
    icon: "/adesivo-gold.png",
    threshold: employees.length,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    borderColor: "border-purple-400",
  },
];