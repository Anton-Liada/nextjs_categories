import { useEffect, useState } from "react";
import axios from "axios";
import { ICategory } from "@/types";
import { BASE_ENDPOINT } from "@/app/utils/common";

const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [tempCategories, setTempCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(BASE_ENDPOINT);

        setCategories(data.categories);
        setTempCategories(data.categories);
      } catch (error) {
        console.error(error);
        setError("Error fetching categories");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const setUseCategories: React.Dispatch<
    React.SetStateAction<ICategory[]>
  > = newCategories => {
    setCategories(newCategories);
  };

  const setUseTempCategories: React.Dispatch<
    React.SetStateAction<ICategory[]>
  > = newCategories => {
    setTempCategories(newCategories);
  };

  return {
    categories,
    tempCategories,
    loading,
    error,
    setUseCategories,
    setUseTempCategories,
  };
};

export default useCategories;
