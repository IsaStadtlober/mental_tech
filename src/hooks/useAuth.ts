import { supabase } from "@/service/supabase";
import { useState } from "react";

interface SchoolSignUpPayload {
  email: string;
  password: string;
  legal_name: string;
  trade_name: string;
  cnpj: string;
  inep_code?: string;
  phone?: string;
  zip_code?: string;
  street?: string;
  number?: string;
  complement?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
}

interface SchoolSignUpData {
  profile_id: string; // ID do perfil de usuário associado à escola
  legal_name: string; // Razão social da escola
  trade_name: string; // Nome fantasia da escola
  cnpj: string; // CNPJ da escola
  inep_code: string; // Código INEP da escola
  contact_email: string; // Email de contato da escola
  phone?: string; // Telefone da escola
  zip_code?: string; // CEP da escola
  street?: string; // Rua da escola
  number?: string; // Número do endereço da escola
  complement?: string; // Complemento do endereço da escola
  neighborhood?: string; // Bairro da escola
  city?: string; // Cidade da escola
  state?: string; // Estado da escola
}

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //Logar como Escola e salvar dados completos da instituição
  async function signUpSchool(schoolData: SchoolSignUpPayload) {
    setLoading(true);
    setError(null);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: schoolData.email,
        password: schoolData.password,
      });

      if (authError) {
        const status = (authError as any)?.status || (authError as any)?.status_code;
        if (status === 429 || /rate limit/i.test(authError.message || '')) {
          throw new Error(
            'Limite de tentativas atingido. Aguarde alguns minutos antes de tentar novamente.',
          );
        }
        throw authError;
      }

      const user = authData.user;
      if (!user) throw new Error("Erro ao recuperar usuário criado.");

      const { error: profileError } = await supabase.from("profiles").insert([
        {
          id: user.id,
          email: user.email,
          full_name: schoolData.trade_name,
          role: "school",
        },
      ]);
      if (profileError) throw profileError;

      const { data, error: insertError } = await supabase
        .from("schools")
        .insert([
          {
            profile_id: user.id,
            legal_name: schoolData.legal_name,
            trade_name: schoolData.trade_name,
            cnpj: schoolData.cnpj.replace(/\D/g, ""), // Limpa máscara de CNPJ
            inep_code: schoolData.inep_code || null,
            contact_email: schoolData.email,
            phone: schoolData.phone || null,
            zip_code: schoolData.zip_code?.replace(/\D/g, "") || null, // Limpa CEP
            street: schoolData.street || null,
            number: schoolData.number || null,
            complement: schoolData.complement || null,
            neighborhood: schoolData.neighborhood || null,
            city: schoolData.city || null,
            state: schoolData.state || null,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;
      return { user, school: data };
    } catch (error: any) {
      setError(error.message);
      console.error("Erro ao registrar escola:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }

  //Cadastrar dados da escola
  async function registerSchoolData(schoolData: SchoolSignUpData) {
    setLoading(true);
    setError(null);
    try {
      const { data, error: insertError } = await supabase
        .from("schools")
        .insert([
          {
            profile_id: schoolData.profile_id,
            legal_name: schoolData.legal_name,
            trade_name: schoolData.trade_name,
            cnpj: schoolData.cnpj.replace(/\D/g, ""), // Limpa máscara de CNPJ (salva só números)
            inep_code: schoolData.inep_code || null,
            contact_email: schoolData.contact_email || null,
            phone: schoolData.phone || null,
            zip_code: schoolData.zip_code?.replace(/\D/g, "") || null, // Limpa cep
            street: schoolData.street || null,
            number: schoolData.number || null,
            complement: schoolData.complement || null,
            neighborhood: schoolData.neighborhood || null,
            city: schoolData.city || null,
            state: schoolData.state || null,
          },
        ])
        .select()
        .single();

      if (insertError) throw insertError;
      return data;
    } catch (err: any) {
      setError(err.message || "Erro ao salvar os detalhes da escola.");
      throw err;
    } finally {
      setLoading(false);
    }
  }
  //Cadastro de turma


  return { loading, error, signUpSchool, registerSchoolData };
}
