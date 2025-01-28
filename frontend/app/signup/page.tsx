"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function Signup() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/auth/signup", formData);
      toast({
        title: "Signed up successfully",
        description: "You can now log in to your account.",
      });
      router.push("/signin");
    } catch (error) {
      console.error(error);
      toast({
        title: "Sign up failed",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-3xl font-bold">Sign up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-white/10 border-white/20"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-white/10 border-white/20"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="bg-white/10 border-white/20"
            />
          </div>
          <Button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-600 w-full text-[#fff]"
          >
            Sign up
          </Button>
          <div className="text-center text-sm">
            Already have an account?
            <Link
              href="/signin"
              className="text-emerald-500 hover:text-emerald-400"
            >
              &nbsp; Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
