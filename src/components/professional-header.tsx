"use client";

import { Shield, Activity, MapPin } from "lucide-react";
import { DarkModeToggle } from "./dark-mode-toggle";

export function ProfessionalHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg blur-sm opacity-75"></div>
            <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Agent Intelligence Demo
            </h1>
            <p className="text-xs text-muted-foreground">Multi-Agent Crime Analysis System</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
            <Activity className="h-4 w-4" />
            <span>Agent Status</span>
          </a>
          <a href="#" className="flex items-center space-x-2 text-sm font-medium hover:text-primary transition-colors">
            <MapPin className="h-4 w-4" />
            <span>Geographic Processing</span>
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Analytics
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Reports
          </a>
        </nav>

        {/* Status Indicator & Theme Toggle */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-sm">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">System Online</span>
          </div>
          <DarkModeToggle />
        </div>
      </div>
    </header>
  );
}
