import React from "react";

export const NotesCard = ({ findVideo }) => {
  return (
    <div>
      <h1 className="font-bold text-xl my-5">My Notes</h1>
      <ul>
        {findVideo?.notes?.map((item) => (
          <li key={item._id}>{item.content}</li>
        ))}
      </ul>
    </div>
  );
};
