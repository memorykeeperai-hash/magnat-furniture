"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  favoritesCount: number;
  isDrawerOpen: boolean;
  setDrawerOpen: (isOpen: boolean) => void;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  // Load favorites from local storage on mount
  useEffect(() => {
    setIsMounted(true);
    const storedFavorites = localStorage.getItem("magnat_favorites");
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
  }, []);

  // Save to local storage whenever favorites change
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("magnat_favorites", JSON.stringify(favorites));
    }
  }, [favorites, isMounted]);

  const toggleFavorite = (slug: string) => {
    setFavorites((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((item) => item !== slug);
      } else {
        return [...prev, slug];
      }
    });
  };

  const isFavorite = (slug: string) => favorites.includes(slug);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.length,
        isDrawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
