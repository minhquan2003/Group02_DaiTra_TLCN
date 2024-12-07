import { useState, useEffect } from "react";
import axios from "axios";

function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5555/admin/categories"
        );
        if (response.data.success) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const createCategory = async (newCategory) => {
    try {
      const response = await axios.post(
        "http://localhost:5555/admin/category/",
        newCategory
      );
      if (response.data.success) {
        setCategories([...categories, response.data.data]);
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const editCategory = async (id, updatedCategory) => {
    try {
      const response = await axios.put(
        `http://localhost:5555/admin/category/${id}`,
        updatedCategory
      );
      if (response.data.success) {
        setCategories(
          categories.map((cat) => (cat._id === id ? response.data.data : cat))
        );
      }
    } catch (error) {
      console.error("Error editing category:", error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/admin/category/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return { categories, loading, createCategory, editCategory, deleteCategory };
}

export default useCategory;
