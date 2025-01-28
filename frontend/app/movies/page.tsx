"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PlusCircle, LogOut } from "lucide-react";
import MovieGrid from "@/components/movie-grid";
import { apiBaseUrl } from "@/components/const";
import axios from "axios";

export default function Movies() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signin");
        return;
      }

      const response = await axios.get(`${apiBaseUrl}/api/movies`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(response?.data);
    } catch (error: any) {
      console.error("Error fetching movies:", error);
      if (error.response?.status === 401) {
        router.push("/signin");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDeleteMovie = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      await axios.delete(`${apiBaseUrl}/api/movies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchMovies();
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading movies...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3 p-4">
            <h1 className="text-3xl font-bold">My Movies</h1>
            <Button
              onClick={() => router.push("/add-movie")}
              className="p-0 h-auto rounded-full bg-gray-200 mt-1"
            >
              <PlusCircle className="m-0 p-0 h-[25px] w-[25px]" />
            </Button>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/signin");
              }}
              className="border-white/20 hover:bg-white/10 bg-[#002520]"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        <MovieGrid movies={movies} onDelete={handleDeleteMovie} />
      </div>
    </div>
  );
}
