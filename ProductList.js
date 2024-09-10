//Imports....
import React, { useMemo, useState } from "react";
import { useTable, usePagination, useSortBy, useGlobalFilter } from "react-table";
import { Table, Pagination, Button, Modal, InputGroup, FormControl, Row, Col, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductForm from "./ProductForm";
import productsData from "./products.json";


//GlobalFilter Component

function GlobalFilter({ globalFilter, setGlobalFilter }) {
  return (
    <InputGroup>
      <FormControl
        value={globalFilter || ""}
        onChange={(e) => setGlobalFilter(e.target.value || undefined)}
        placeholder="Search products..."
        className="rounded-lg shadow-sm"
      />
    </InputGroup>
  );
}

//ProductList Component
//State Management

const ProductList = () => {
  const [data, setData] = useState(productsData);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");


//Defining Columns

  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Name", accessor: "name" },
      { Header: "Description", accessor: "desc" },
      { Header: "Category", accessor: "category" },
      { Header: "Price", accessor: "price" },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <Button variant="warning" size="sm" onClick={() => handleEdit(row.original)}>
              Edit
            </Button>
            <Button variant="danger" size="sm" onClick={() => handleDelete(row.original.id)} className="ml-2">
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );


//Adding and Updating Products

  const addProduct = (product) => {
    setData((prevData) => [...prevData, product]);
    setShowModal(false);
    setSuccessMessage("New product has been added!");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const updateProduct = (updatedProduct) => {
    setData((prevData) =>
      prevData.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
    setShowModal(false);
  };

//Handlers

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((product) => product.id !== id));
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowModal(true);
  };


  //Table Hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setGlobalFilter,
    state: { pageIndex, globalFilter },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
    );
  
  //Form content...

  return (
    <div className="container mt-5 main-page-bg">
      <div className="fixed-top bg-white py-2">
        <Card className="text-center shadow-sm">
          <Card.Body>
            <Card.Title as="h1" className="mb-0 text-primary">
              Product List
            </Card.Title>
          </Card.Body>
        </Card>
      </div>

      <div style={{ paddingTop: "120px" }}>
        <Row className="align-items-center mb-3">
          <Col xs={12} md={4}>
            <Button variant="primary" onClick={handleAdd} className="w-100">
              Add Product
            </Button>
          </Col>
          <Col xs={12} md={8}>
            <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
          </Col>
        </Row>

        {successMessage && (
          <div className="alert alert-success mt-3">
            {successMessage}
          </div>
        )}

        
        <Table {...getTableProps()} striped bordered hover responsive>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </Table>

        <Pagination className="justify-content-center">
          <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
          <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
          {pageOptions.map((pageIdx) => (
            <Pagination.Item
              key={pageIdx}
              onClick={() => gotoPage(pageIdx)}
              active={pageIdx === pageIndex}
            >
              {pageIdx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
          <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
        </Pagination>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProduct ? "Edit Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            addProduct={addProduct}
            updateProduct={updateProduct}
            editingProduct={editingProduct}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProductList;
