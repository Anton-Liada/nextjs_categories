"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Category } from "@/types";

const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/categories"
        );

        setCategories(data.categories);
      } catch (error) {
        console.error(error);
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { categories, loading, error };
};

export default useCategories;
