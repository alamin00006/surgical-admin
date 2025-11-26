// src/app/dashboard/settings/page.tsx
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTheme } from "@/components/theme/theme-provider";

const colorPresets = [
  { name: "Blue", value: "blue" },
  { name: "Green", value: "green" },
  { name: "Purple", value: "purple" },
  { name: "Orange", value: "orange" },
];

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [primaryColor, setPrimaryColor] = useState("blue");

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        Settings
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Theme Settings</CardTitle>
            <CardDescription>
              Customize the appearance of your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Theme Mode
              </label>
              <div className="flex space-x-4 mt-2">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => setTheme("light")}
                >
                  Light
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => setTheme("dark")}
                >
                  Dark
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => setTheme("system")}
                >
                  System
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Primary Color
              </label>
              <div className="flex space-x-2 mt-2">
                {colorPresets.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setPrimaryColor(color.value)}
                    className={`w-8 h-8 rounded-full bg-${color.value}-500 ${
                      primaryColor === color.value
                        ? "ring-2 ring-offset-2 ring-gray-400"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Manage your general preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email Notifications
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Receive email notifications
                </p>
              </div>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Two-Factor Authentication
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Add an extra layer of security
                </p>
              </div>
              <input type="checkbox" className="rounded" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
