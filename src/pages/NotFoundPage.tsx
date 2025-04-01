import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl">Page Not Found</p>
        <Button onClick={handleRedirect}>Go to Homepage</Button>{" "}
      </div>
    </div>
  );
};
