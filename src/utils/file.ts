// Função utilitária para formatar o nome do arquivo
export function formatFileName(fileNameOrUrl?: string): string {
  if (!fileNameOrUrl) return "";

  const fullName =
    fileNameOrUrl.split("/").pop()?.split("?")[0] || fileNameOrUrl;

  const cleanName = fullName
    .replace(/^\d+_/, "")
    .replace(/^[a-f0-9-]{36}_?/, "");

  try {
    return decodeURIComponent(cleanName);
  } catch {
    return cleanName;
  }
}