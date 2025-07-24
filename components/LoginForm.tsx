"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { login } from "@/lib/api";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // state baru
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(username, password);

      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("user", JSON.stringify(res.user));

        toast.success("Login berhasil!");
        setTimeout(() => router.push("/dashboard"), 1000);
      } else {
        toast.error("Login gagal", {
          description: "Token tidak ditemukan.",
        });
      }
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Terjadi kesalahan saat login.";
      toast.error("Login gagal", {
        description: msg,
      });
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-center min-h-screen px-4",
        className
      )}
      {...props}
    >
      <Card className="w-full max-w-4xl shadow-xl mx-auto p-8">
        <CardHeader className="flex flex-col items-center">
          {/* Logo */}
          <img
            src="/banner.png"
            alt="Logo"
            className="w-36 h-36 object-contain mb-2"
          />
          <CardTitle className="text-2xl font-bold text-blue-900">
            Selamat Datang 👋
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 text-center">
            Masuk ke akun kamu untuk mulai belanja
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  Lupa password?
                </a>
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-10" // beri ruang buat icon mata
              />
              {/* Icon mata */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10 10 0 0 1 6.06 6.06" />
                    <path d="M1 1l22 22" />
                    <path d="M10.59 10.59a3 3 0 0 0 4.24 4.24" />
                    <path d="M12 5c7 0 9 7 9 7s-2 7-9 7a9.96 9.96 0 0 1-5.64-1.8" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              Login
            </Button>
          </form>

          <p className="text-center text-sm mt-6">
            Belum punya akun?{" "}
            <a href="#" className="text-blue-600 underline underline-offset-4">
              Daftar sekarang
            </a>
          </p>
          <div className="text-center text-xs text-muted-foreground mt-6 max-w-xs mx-auto space-y-1">
            <p>Belanja hemat, hidup nikmat.</p>
            <p>
              Dengan login, kamu menyetujui{" "}
              <a href="#" className="underline underline-offset-4">
                Ketentuan Layanan
              </a>{" "}
              dan{" "}
              <a href="#" className="underline underline-offset-4">
                Kebijakan Privasi
              </a>
              .
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
