//Importing Dependencies
import React, { useState, useEffect } from "react";
import { Button, Form, Col, Row, Card } from "react-bootstrap";


//Component Declaration and Initial State
const ProductForm = ({ addProduct, updateProduct, editingProduct }) => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    desc: "",
    category: "",
    price: "",
  });


  //Effect Hook for Editing Mode

  useEffect(() => {
    if (editingProduct) {
      setProduct(editingProduct);
    } else {
      setProduct({
        id: "",
        name: "",
        desc: "",
        category: "",
        price: "",
      });
    }
  }, [editingProduct]);


  //Handling Input Changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


//Handling Form Submission

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(product);
    } else {
      addProduct(product);
    }
  };

//Rendering the Form

  return (
    <Card className="shadow-lg p-3 mb-5 bg-body rounded">
      <Card.Header className="text-center bg-primary text-white">
        <h3>{editingProduct ? "Update Product" : "Add Product"}</h3>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
              
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formId">
                <Form.Label>ID</Form.Label>
                <Form.Control
                  type="number"
                  name="id"
                  value={product.id}
                  onChange={handleChange}
                  required
                  readOnly={!!editingProduct}
                  className="border border-info"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  required
                  className="border border-success"
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formDesc">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="desc"
                  value={product.desc}
                  onChange={handleChange}
                  required
                  className="border border-warning"
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  required
                  className="border border-danger"
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              required
              className="border border-primary"
            />
          </Form.Group>

          
          <div className="text-center">
            <Button variant="success" type="submit" className="px-4">
              {editingProduct ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default ProductForm;
