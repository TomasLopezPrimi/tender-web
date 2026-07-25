import { ForgotPasswordForm } from "@/components/cuenta/auth-forms";
import { AuthCard } from "@/components/cuenta/account-ui";

export default function ForgotPasswordPage() {
  return <AuthCard title="Recuperar contraseña" intro="Te enviaremos un enlace si el email corresponde a una cuenta Tender."><ForgotPasswordForm /></AuthCard>;
}
