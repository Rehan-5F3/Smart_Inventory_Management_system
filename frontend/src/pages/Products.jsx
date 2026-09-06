import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../services/productService";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
function Products() {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    material: "",
    weight: "",
    purchasePrice: "",
    sellingPrice: "",
    supplier: "",
    stock: "",
  });

  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [image, setImage] = useState(null);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const totalProducts = products.length;

const inventoryValue = products.reduce(
  (total, item) => total + item.sellingPrice * item.stock,
  0
);

const lowStock = products.filter((item) => item.stock <= 5).length;

const goldProducts = products.filter(
  (item) => item.material === "Gold"
).length;

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("🗑 Product Deleted Successfully!");

      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const handleEdit = (item) => {
    setProduct({
      productName: item.productName,
      category: item.category,
      material: item.material,
      weight: item.weight,
      purchasePrice: item.purchasePrice,
      sellingPrice: item.sellingPrice,
      supplier: item.supplier,
      stock: item.stock,
    });

    setEditId(item._id);
    setShowModal(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async () => {
  try {

    const formData = new FormData();

    Object.keys(product).forEach((key) => {
      formData.append(key, product[key]);
    });

    if (image) {
      formData.append("image", image);
    }


    if (editId) {

      await updateProduct(editId, formData);

      alert("✅ Product Updated Successfully!");

      setEditId(null);

    } else {

      await addProduct(formData);

      alert("✅ Product Added Successfully!");

    }

    fetchProducts();
    setShowModal(false);

    setProduct({
      productName: "",
      category: "",
      material: "",
      weight: "",
      purchasePrice: "",
      sellingPrice: "",
      supplier: "",
      stock: "",
    });

    setImage(null);

  } catch (error) {
  console.log(error);
  alert(error.message);
}
};

const filteredProducts = products.filter((item) => {
  const text = search.toLowerCase();

  return (
    item.productName.toLowerCase().includes(text) ||
    item.category.toLowerCase().includes(text) ||
    item.material.toLowerCase().includes(text) ||
    item.supplier.toLowerCase().includes(text)
  );
});

  return (
    
      <Layout>

<div className="container-fluid">
         <div className="card p-4 shadow mb-5">
         <div className="row mb-4">

  <div className="col-md-3 mb-3">
    <div className="card shadow border-0 text-center p-3">
      <h2>📦</h2>
      <h5>Total Products</h5>
      <h3>{totalProducts}</h3>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="card shadow border-0 text-center p-3">
      <h2>💰</h2>
      <h5>Inventory Value</h5>
      <h3>₹{inventoryValue.toLocaleString()}</h3>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="card shadow border-0 text-center p-3">
      <h2>⚠️</h2>
      <h5>Low Stock</h5>
      <h3>{lowStock}</h3>
    </div>
  </div>

  <div className="col-md-3 mb-3">
    <div className="card shadow border-0 text-center p-3">
      <h2>💎</h2>
      <h5>Gold Products</h5>
      <h3>{goldProducts}</h3>
    </div>
  </div>
</div>
</div>

        <div className="d-flex justify-content-between align-items-center mb-4">

  <div className="d-flex justify-content-between align-items-center mb-4">
  <div>
    <h2 className="fw-bold mb-1">📦 Product Inventory</h2>
    <p className="text-muted mb-0">
      Manage all your jewellery products from one place.
    </p>
  </div>

  
</div>

  <button
    className="btn btn-warning text-dark fw-bold"
    onClick={() => {
      setShowModal(true);
      setEditId(null);

      setProduct({
        productName: "",
        category: "",
        material: "",
        weight: "",
        purchasePrice: "",
        sellingPrice: "",
        supplier: "",
        stock: "",
      });

      setImage(null);
    }}
  >
    ➕ Add Product
  </button>

</div>

        <div
  className="card border-0 shadow-lg mb-5"
  style={{
    borderRadius: "20px",
    overflow: "hidden",
  }}
>
  <div
    style={{
      background: "linear-gradient(135deg,#1E1E2F,#2D2D44)",
      color: "white",
      padding: "20px 30px",
    }}
  >
    <h4 className="mb-1">💎 Product Details</h4>
    <small style={{ color: "#ddd" }}>
      Fill in the jewellery information below
    </small>
  </div>

  
        </div>

        <div className="card shadow-sm border-0 mb-4">
  <div className="card-body">
    <input
      type="text"
      className="form-control form-control-lg"
      placeholder="🔍 Search by Product, Category, Material or Supplier..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</div>

        <h3 className="mb-3">📋 Product List</h3>

        <div className="card border-0 shadow-lg rounded-4">
  <div className="card-body p-4">

    <table className="table table-hover align-middle">

      {/* your existing table */}
       <thead
             style={{
                background: "#1f1f2e",
                color: "white",
              }}
        >
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Category</th>
              <th>Material</th>
              <th>Purchase Price</th>
              <th>Selling Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.length > 0 ? (
              filteredProducts.map((item) => (
                <tr key={item._id}>
                   <td>
                        <img
  src={item.image}
  alt={item.productName}
  style={{
    width: "80px",
    height: "80px",
    objectFit: "cover",
    borderRadius: "12px",
    border: "2px solid #D4AF37",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
  }}
/>
                    </td>
                  <td>{item.productName}</td>
                  <td>{item.category}</td>
                  <td>{item.material}</td>
                  <td>₹{Number(item.purchasePrice).toLocaleString("en-IN")}</td>
                  <td>₹{Number(item.sellingPrice).toLocaleString("en-IN")}</td>
                  <td>
  <span
    className={`badge ${
      item.stock > 10
        ? "bg-success"
        : item.stock > 0
        ? "bg-warning text-dark"
        : "bg-danger"
    }`}
  >
    {item.stock} in stock
  </span>
</td>
                  <td>
                    <button
                         className="btn btn-outline-primary btn-sm me-2" onClick={() => handleEdit(item)}
                    >
                        <i className="bi bi-pencil-square"></i>
                    </button>

                    <button
                        className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(item._id)}
                    >
                        <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">
                  No Products Found
                </td>
              </tr>
            )}
          </tbody>

    </table>

  </div>
</div>
          
        <Modal
  show={showModal}
  onHide={() => setShowModal(false)}
  size="lg"
  centered
>
  <Modal.Header closeButton>
    <Modal.Title>💎 Add Product</Modal.Title>
  </Modal.Header>

  <Modal.Body>

    <div className="card-body p-4">
          <input
            className="form-control mb-3"
            placeholder="Product Name"
            name="productName"
            value={product.productName}
            onChange={handleChange}
          />
          <input
            className="form-control mb-3"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          <select
            className="form-control mb-3"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option>Ring</option>
            <option>Necklace</option>
            <option>Pendant</option>
            <option>Chain</option>
            <option>Earrings</option>
            <option>Bangles</option>
            <option>Bracelet</option>
            <option>Anklets</option>
          </select>

          <select
            className="form-control mb-3"
            name="material"
            value={product.material}
            onChange={handleChange}
          >
            <option value="">Select Material</option>
            <option>Gold</option>
            <option>One Gram</option>
            <option>Silver</option>
          </select>

          <input
            className="form-control mb-3"
            type="number"
            placeholder="Weight (grams)"
            name="weight"
            value={product.weight}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="number"
            placeholder="Purchase Price"
            name="purchasePrice"
            value={product.purchasePrice}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="number"
            placeholder="Selling Price"
            name="sellingPrice"
            value={product.sellingPrice}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            placeholder="Supplier"
            name="supplier"
            value={product.supplier}
            onChange={handleChange}
          />

          <input
            className="form-control mb-4"
            type="number"
            placeholder="Stock"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />

          <button className="btn btn-dark w-100" onClick={handleSubmit}>
            {editId ? "Update Product" : "Add Product"}
          </button>
        </div>

  </Modal.Body>
</Modal>
      </div>
    </Layout>
  );
}

export default Products;