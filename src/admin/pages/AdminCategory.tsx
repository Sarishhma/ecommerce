import React, { useState } from "react";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

import {
  useGetCategories,
  useCreateCategory,
  useUpdateCategory,
  useDeleteCategory,
} from "@/features/category/hooks/useCategories";

import type {
  Category,
  CreateCategoryPayload,
} from "@/features/category/types/category.types";

import { AdminCategoryHeader } from "../components/adminCategory/AdminCategoryHeader";
import { AdminCategoryStats } from "../components/adminCategory/AdminCategoryStats";


import { CategoryFormModal } from "../components/adminCategory/CategoryFormModal";
import { CategoryDeleteDialog } from "../components/adminCategory/CategoryDeleteDialogue";
import { AdminCategoryTable } from "../components/adminCategory/CategoryList";
import { AdminCategoryToolbar } from "../components/adminCategory/adminCategoryToolbar";

export const AdminCategories: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const [editingCategory, setEditingCategory] =
    useState<Category | null>(null);

  const [deletingCategory, setDeletingCategory] =
    useState<Category | null>(null);


  const {
    data,
    isLoading,
    isError,
  } = useGetCategories({
    search: searchTerm,
    page,
  });


  const {
    mutate: createCategory,
    isPending: isCreating,
  } = useCreateCategory();

  const {
    mutate: updateCategory,
    isPending: isUpdating,
  } = useUpdateCategory();

  const {
    mutate: deleteCategory,
    isPending: isDeleting,
  } = useDeleteCategory();


  const categories = data?.results ?? [];


  const handleAdd = () => {
    setEditingCategory(null);
    setIsFormOpen(true);
  };


  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsFormOpen(true);
  };


  const handleSubmit = (
    payload: CreateCategoryPayload
  ) => {

    if (editingCategory) {

      updateCategory(
        {
          id: editingCategory.id,
          payload,
        },
        {
          onSuccess: () => {
            setIsFormOpen(false);
            setEditingCategory(null);
          },
        }
      );

      return;
    }


    createCategory(
      payload,
      {
        onSuccess: () => {
          setIsFormOpen(false);
        },
      }
    );
  };


  const handleDelete = (id: number) => {

    deleteCategory(
      id,
      {
        onSuccess: () => {
          setDeletingCategory(null);
        },
      }
    );
  };


  if (isError) {
    return (
      <div >

        <Card className="border-gray-200">
          <CardContent className="py-16 text-center">

            <h2 className="text-lg font-semibold text-gray-900">
              Unable to load categories
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Something went wrong while loading categories.
            </p>

            <Button
              variant="outline"
              className="mt-5"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>

          </CardContent>
        </Card>

      </div>
    );
  }


  return (
    <div className="min-h-full">

      <div className="max-w-7xl mx-auto    space-y-8">

        {/* HEADER */}

        <AdminCategoryHeader
          onAdd={handleAdd}
        />


        {/* STATS */}

        <AdminCategoryStats
          total={data?.count ?? 0}
          visible={categories.length}
        />


        {/* TABLE CARD */}

        <div className="
          bg-white
          border
          border-gray-100
          rounded-2xl
          overflow-hidden
        ">

          <AdminCategoryToolbar
            total={categories.length}
            search={searchTerm}
            onSearchChange={(value) => {
              setSearchTerm(value);
              setPage(1);
            }}
          />

          <AdminCategoryTable
            categories={categories}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={setDeletingCategory}
          />

        </div>


        {/* MODALS */}

        <CategoryFormModal
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingCategory(null);
          }}
          onSubmit={handleSubmit}
          editingCategory={editingCategory}
          isSubmitting={
            isCreating || isUpdating
          }
        />

        <CategoryDeleteDialog
          category={deletingCategory}
          onClose={() =>
            setDeletingCategory(null)
          }
          onConfirm={handleDelete}
          isDeleting={isDeleting}
        />

      </div>

    </div>
  );
};