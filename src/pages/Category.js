import React from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { useData } from "../context/DataContext";
import { Card } from "../components/Card";

export const Category = () => {
  const { categoryId } = useParams();
  const { state } = useData();
  const navigate = useNavigate();

  const filterCateg = state?.videoData?.filter(
    (item) => item.category === categoryId
  );

  return (
    <div className="py-2 px-6">
      <h1 className="font-bold text-2xl my-4">{categoryId}</h1>
      <ul className="flex flex-wrap gap-10">
        {filterCateg?.map((item) => (
          <li
            key={item._id}
            className="w-60"
            onClick={() => navigate(`/video/${item._id}`)}
          >
            <Card item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
};
