import { useState } from "react";

export type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <div className="flex justify-center items-center bg-blue-600 min-h-screen px-20">
      {children}
    </div>
  );
};
