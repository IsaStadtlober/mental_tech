import { useRouter } from "expo-router";
import { GraduationCap } from "lucide-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

import { FormField } from "../../../components/form/FormField";
import { AuthHeader } from "../../../components/Headers";
import { PrimaryButton } from "../../../components/PrimaryButton";
import { ScreenShell } from "../../../components/ScreenShell";

import { EDUCATOR_AUTH_CONSTANTS } from "../../../constants/auth";
import { useWizardFlow } from "../../../hooks/useWizardFlow";
import { styles } from "../../../styles";
import {
  fetchAddressByCep,
  fetchCnpjData,
  isValidCep,
  isValidCnpj,
  isValidEmail,
  sanitizeDigits,
} from "../../../utils/auth";

export default function SchoolSignupRoute() {
  const router = useRouter();
  const { setSchoolData } = useWizardFlow();
  const lastSearchedCnpj = useRef("");
  const lastSearchedCep = useRef("");

  const [tradeName, setTradeName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [inepCode, setInepCode] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [city, setCity] = useState("");
  const [stateField, setStateField] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [cnpjLookupError, setCnpjLookupError] = useState("");
  const [cepLookupError, setCepLookupError] = useState("");
  const [, setLookupLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const isEmailValid = isValidEmail(email);
  const passwordMismatch = Boolean(
    confirmPassword && password !== confirmPassword,
  );
  const isPasswordLengthValid =
    password.length >= EDUCATOR_AUTH_CONSTANTS.MIN_PASSWORD_LENGTH;

  const isSchoolFormValid =
    tradeName.trim().length > 0 &&
    legalName.trim().length > 0 &&
    cnpj.trim().length > 0 &&
    phone.trim().length > 0 &&
    city.trim().length > 0 &&
    stateField.trim().length > 0;

  const isFormValid =
    isSchoolFormValid &&
    isEmailValid &&
    isPasswordLengthValid &&
    password === confirmPassword;

  const handleCnpjBlur = useCallback(async () => {
    const sanitized = sanitizeDigits(cnpj);
    if (!isValidCnpj(sanitized) || sanitized === lastSearchedCnpj.current)
      return;

    try {
      setLookupLoading(true);
      lastSearchedCnpj.current = sanitized;
      setCnpj(
        sanitized.replace(
          /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
          "$1.$2.$3/$4-$5",
        ),
      );
      setCnpjLookupError("");

      const result = await fetchCnpjData(sanitized);
      if (result?.legal_name && !legalName.trim()) {
        setLegalName(result.legal_name);
      }
    } catch {
      setCnpjLookupError("Não foi possível buscar dados do CNPJ.");
    } finally {
      setLookupLoading(false);
    }
  }, [cnpj, legalName]);

  const handleZipCodeBlur = useCallback(async () => {
    const sanitized = sanitizeDigits(zipCode);
    if (!isValidCep(sanitized) || sanitized === lastSearchedCep.current) return;

    try {
      setLookupLoading(true);
      lastSearchedCep.current = sanitized;
      setZipCode(`${sanitized.slice(0, 5)}-${sanitized.slice(5)}`);
      setCepLookupError("");

      const address = await fetchAddressByCep(sanitized);
      if (!address) {
        setCepLookupError("CEP não encontrado.");
        return;
      }

      if (address.street && !street.trim()) {
        setStreet(address.street);
      }
      if (address.neighborhood && !neighborhood.trim()) {
        setNeighborhood(address.neighborhood);
      }
      if (address.city && !city.trim()) {
        setCity(address.city);
      }
      if (address.state && !stateField.trim()) {
        setStateField(address.state);
      }
    } catch {
      setCepLookupError("Não foi possível buscar o CEP.");
    } finally {
      setLookupLoading(false);
    }
  }, [zipCode, street, neighborhood, city, stateField]);

  const submitRef = useRef(false);

  const handleCreated = async () => {
    if (saving || submitRef.current || !isFormValid) return;

    submitRef.current = true;
    setFormError("");
    setSaving(true);

    try {
      setSchoolData({
        email: email.trim(),
        password,
        legal_name: legalName.trim(),
        trade_name: tradeName.trim(),
        cnpj: cnpj.trim(),
        inep_code: inepCode.trim(),
        phone: phone.trim(),
        zip_code: zipCode.trim(),
        street: street.trim(),
        number: number.trim(),
        complement: complement.trim(),
        neighborhood: neighborhood.trim(),
        city: city.trim(),
        state: stateField.trim(),
      });

      router.push({
        pathname: "/wizard",
        params: { schoolName: tradeName.trim() },
      });
    } catch (err: any) {
      setFormError(err?.message || "Erro ao salvar os dados da escola.");
    } finally {
      submitRef.current = false;
      setSaving(false);
    }
  };
  // Busca automática ao digitar os números completos
  useEffect(() => {
    const sanitized = sanitizeDigits(cnpj);
    if (sanitized.length === 14) {
      const id = setTimeout(() => {
        handleCnpjBlur();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [cnpj, handleCnpjBlur]);

  useEffect(() => {
    const sanitized = sanitizeDigits(zipCode);
    if (sanitized.length === 8) {
      const id = setTimeout(() => {
        handleZipCodeBlur();
      }, 0);
      return () => clearTimeout(id);
    }
  }, [zipCode, handleZipCodeBlur]);

  return (
    <ScreenShell
      onBack={() => router.back()}
      footer={
        <PrimaryButton
          disabled={!isFormValid || saving}
          onPress={() => !saving && isFormValid && handleCreated()}
        >
          {saving
            ? "Aguarde..."
            : EDUCATOR_AUTH_CONSTANTS.TEXTS.BUTTON_CONTINUE}
        </PrimaryButton>
      }
    >
      <AuthHeader
        Icon={GraduationCap}
        title={EDUCATOR_AUTH_CONSTANTS.TEXTS.SIGNUP_TITLE}
        subtitle={EDUCATOR_AUTH_CONSTANTS.TEXTS.SIGNUP_SUBTITLE}
        align="center"
      />

      <View style={styles.formStack}>
        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.SCHOOL_NAME}
          value={tradeName}
          onChangeText={setTradeName}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.SCHOOL_NAME}
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.LEGAL_NAME}
          value={legalName}
          onChangeText={setLegalName}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.LEGAL_NAME}
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.CNPJ}
          value={cnpj}
          onChangeText={setCnpj}
          onBlur={handleCnpjBlur}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.CNPJ}
          keyboardType="number-pad"
          maxLength={18}
          preset="educator"
        />
        {!!cnpjLookupError && (
          <Text style={styles.errorText}>{cnpjLookupError}</Text>
        )}

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.RESPONSIBLE_EMAIL}
          value={email}
          onChangeText={setEmail}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.EMAIL}
          keyboardType="email-address"
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.PHONE}
          value={phone}
          onChangeText={setPhone}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.PHONE}
          keyboardType="phone-pad"
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.INEP_CODE}
          value={inepCode}
          onChangeText={setInepCode}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.INEP_CODE}
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.ZIP_CODE}
          value={zipCode}
          onChangeText={setZipCode}
          onBlur={handleZipCodeBlur}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.ZIP_CODE}
          keyboardType="number-pad"
          maxLength={9}
          preset="educator"
        />
        {!!cepLookupError && (
          <Text style={styles.errorText}>{cepLookupError}</Text>
        )}

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.STREET}
          value={street}
          onChangeText={setStreet}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.STREET}
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.NUMBER}
          value={number}
          onChangeText={setNumber}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.NUMBER}
          keyboardType="number-pad"
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.COMPLEMENT}
          value={complement}
          onChangeText={setComplement}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.COMPLEMENT}
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.NEIGHBORHOOD}
          value={neighborhood}
          onChangeText={setNeighborhood}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.NEIGHBORHOOD}
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.CITY}
          value={city}
          onChangeText={setCity}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.CITY}
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.STATE}
          value={stateField}
          onChangeText={setStateField}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.STATE}
          preset="educator"
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.CREATE_PASSWORD}
          value={password}
          onChangeText={setPassword}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.CREATE_PASSWORD}
          secureTextEntry
        />

        <FormField
          label={EDUCATOR_AUTH_CONSTANTS.LABELS.CONFIRM_PASSWORD}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder={EDUCATOR_AUTH_CONSTANTS.PLACEHOLDERS.CONFIRM_PASSWORD}
          error={passwordMismatch}
          secureTextEntry
        />

        {passwordMismatch && (
          <Text style={styles.errorText}>
            {EDUCATOR_AUTH_CONSTANTS.ERRORS.PASSWORD_MISMATCH}
          </Text>
        )}

        {password.length > 0 && !isPasswordLengthValid && (
          <Text style={styles.errorText}>
            {EDUCATOR_AUTH_CONSTANTS.ERRORS.PASSWORD_TOO_SHORT}
          </Text>
        )}

        {!!formError && <Text style={styles.errorText}>{formError}</Text>}
      </View>
    </ScreenShell>
  );
}