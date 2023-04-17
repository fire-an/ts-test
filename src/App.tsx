import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductManagementPage from "./pages/admin/ProductManagementPage";
import AdminLayout from "./pages/layouts/AdminLayout";
import AddProductPage from "./pages/admin/AddProductPage";
import UpdateProductPage from "./pages/admin/UpdateProductPage";
// import "./App.css";
import { IProduct } from "./types/product";
import {
  getAllProduct,
  deleteProduct,
  addProduct,
  updateProduct,
} from "./api/product";

function App() {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    getAllProduct().then(({ data }) => setProducts(data));
  }, []);

  const onHandleRemove = (id: number) => {
    deleteProduct(id).then(() =>
      setProducts(products.filter((item: IProduct) => item.id !== id))
    );
  };
  const onHandleAdd = (product: IProduct) => {
    addProduct(product).then(() =>
      getAllProduct().then(({ data }) => setProducts(data))
    );
  };
  const onHandleUpdate = (product: IProduct) => {
    updateProduct(product).then(() =>
      getAllProduct().then(({ data }) => setProducts(data))
    );
  };
  return (
    <div className="app">
      <Routes>
        <Route path="/">
          <Route index element={<HomePage />} />
          <Route
            path="products"
            element={
              <ProductPage products={products} onRemove={onHandleRemove} />
            }
          />
          <Route
            path="products/:id"
            element={<ProductDetailPage products={products} />}
          />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="products">
            <Route
              index
              element={
                <ProductManagementPage
                  products={products}
                  onRemove={onHandleRemove}
                />
              }
            />
            <Route
              path="add"
              element={<AddProductPage onAdd={onHandleAdd} />}
            />
            <Route
              path=":id/update"
              element={
                <UpdateProductPage
                  onUpdate={onHandleUpdate}
                  products={products}
                />
              }
            />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
