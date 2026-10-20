import { Slot } from "expo-router";
import { ProfessorProvider } from "@/contexts/ProfessorContext";

export default function ProfessorLayout() {
  return (
    <ProfessorProvider>
      <Slot />
    </ProfessorProvider>
  );
}