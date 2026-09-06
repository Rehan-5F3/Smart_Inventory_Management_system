import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { createSale } from "../services/saleService";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Sales() {
  const [products, setProducts] = useState([]);

  const [sale, setSale] = useState({
    productId: "",
    quantity: 1,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setSale({
      ...sale,
      [e.target.name]: e.target.value,
    });
  };

  const handleSale = async () => {
    try {
      await createSale(sale);

      alert("✅ Product Sold Successfully!");

      setSale({
        productId: "",
        quantity: 1,
      });

      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Sale Failed");
    }
  };

  return (
    <>
      <Sidebar />

      <div className="p-4"
        style={{
          marginLeft: "260px",
          width: "calc(100% - 260px)",
        }}
      >
        <h2 className="mb-4">💰 Sales</h2>

        <div className="card shadow p-4">
          <select
            className="form-control mb-3"
            name="productId"
            value={sale.productId}
            onChange={handleChange}
          >
            <option value="">Select Product</option>

            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.productName} (Stock: {product.stock})
              </option>
            ))}
          </select>

          <input
            className="form-control mb-3"
            type="number"
            name="quantity"
            value={sale.quantity}
            onChange={handleChange}
            placeholder="Quantity"
          />

          <button
            className="btn btn-success w-100"
            onClick={handleSale}
          >
            Sell Product
          </button>
        </div>
      </div>
    </>
  );
}

export default Sales;