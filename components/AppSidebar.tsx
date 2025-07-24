"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: "📊" },
  { name: "Customers", href: "/dashboard/pelanggan", icon: "👥" }, // pastikan ini sesuai route
  { name: "Categori", href: "/dashboard/kategori", icon: "📂" },
  { name: "Products", href: "/dashboard/products", icon: "📦" },
  { name: "Stock", href: "/dashboard/stock", icon: "📈" },
  { name: "Orders", href: "/dashboard/order", icon: "🛒" },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-blue-400 text-white min-h-screen p-8 flex flex-col shadow-lg">
      {/* Logo + Text */}
      <div className="flex flex-col items-center mb-12">
        <img
          src="/banner.png"
          alt="Logo"
          className="w-24 h-24 rounded-md object-contain"
        />
        <span className="mt-6 text-white font-sans font-extrabold text-4xl select-none">
          blibli
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-3 font-semibold">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-4 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer select-none",
                isActive
                  ? "bg-cyan-600 text-white shadow-md"
                  : "text-white hover:bg-blue-800 hover:text-white"
              )}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-lg">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto pt-8 text-sm text-blue-300">
        © 2025 blibli. All rights reserved.
      </div>
    </aside>
  );
}
