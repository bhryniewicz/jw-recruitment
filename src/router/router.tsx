import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductDetails } from "@/pages/ProductDetailsPage";
import { HomePage } from "@/pages/HomePage";
import { Navbar } from "@/components/Navbar";
import { NotFoundPage } from "@/pages/NotFoundPage";

export const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="404" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};
