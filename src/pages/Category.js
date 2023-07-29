import React from "react";
import { useParams } from "react-router";

export const Category = () => {
  const { categoryId } = useParams();

  return <div>Category{categoryId}</div>;
};
