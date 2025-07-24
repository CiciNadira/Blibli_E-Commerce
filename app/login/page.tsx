// HARUS PAKAI KURUNG KURAWAL karena named export
import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-400 to-blue-500">
      <LoginForm />
    </div>
  );
}
