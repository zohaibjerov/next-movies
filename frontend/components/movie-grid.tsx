"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";
import { Modal } from "@/components/ui/modal";

interface Movie {
  _id?: string | number | any;
  title: string;
  year: number;
  poster: string;
  color?: string;
}

interface MovieGridProps {
  movies: Movie[];
  onDelete: (id: number) => Promise<void>;
}

export default function MovieGrid({ movies, onDelete }: MovieGridProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const openModal = (id: number) => {
    setSelectedMovieId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovieId(null);
  };

  const handleDelete = async () => {
    if (selectedMovieId) {
      await onDelete(selectedMovieId);
      closeModal();
    }
  };

  const handleEditClick = async (id: string | number) => {
    setIsRedirecting(true);
    const editPath = `/edit/${id}`;
    if (pathname !== editPath) {
      router.push(editPath);
    }
    setIsRedirecting(false);
  };

  const handleAddMovieClick = () => {
    router.push("/add-movie"); // Navigate to add-movie route
  };

  if (movies?.length === 0) {
    return (
      <div className="text-center py-32">
        <h2 className="text-2xl font-semibold mb-6">
          Your movie list is empty
        </h2>
        <Button
          onClick={handleAddMovieClick}
          className="bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          Add a new movie
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {movies.map((movie: Movie) => (
          <Card
            key={movie?._id}
            className={`bg-[#012b37] border-white/20 relative group`}
          >
            <div className="relative aspect-[3/4]">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="rounded-lg object-cover rounded-t-lg"
              />
              {/* Edit Button */}
              <Button
                variant="secondary"
                size="icon"
                className="bg-[#005d55cf] absolute top-2 right-2 hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleEditClick(movie?._id)}
              >
                {isRedirecting ? "Loading..." : <Edit className="h-4 w-4" />}
              </Button>
              {/* Delete Button */}
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 left-2 bg-red-600/80 hover:bg-red-700/90 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => openModal(movie?._id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{movie.title}</h3>
              <p className="text-sm text-white/60">{movie.year}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4 text-[#000]">
            Confirm Deletion
          </h2>
          <p className="mb-6 text-[#000]">
            Are you sure you want to delete this movie?
          </p>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
