import React from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Button, message, Popconfirm } from "antd";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct } from "../../types/product";
import { Link } from "react-router-dom";

interface DataType {
  key: string | number;
  id: number;
  name: string;
  price: number;
  description: string;
}
interface IProps {
  products: IProduct[];
  onRemove: (id: number) => void;
}

const ProductManagementPage = (props: IProps) => {
  const confirm = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const cancel = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e);
    message.error("Click on No");
  };

  const removeProduct = (id: number) => {
    props.onRemove(id);
    alert("Xóa thành công");
  };
  const columns: ColumnsType<DataType> = [
    {
      title: "Product Image",
      dataIndex: "image",
      key: "image",
      render: (imgLink) => <img src={imgLink} alt="" />,
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Product Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text) => <p>{text}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <Popconfirm
            title="Xóa"
            description="Bạn có muốn xóa sản phẩm?"
            onConfirm={() => removeProduct(record.id)}
            onCancel={() => cancel}
            okText="Có"
            cancelText="Không"
          >
            <Button type="primary" style={{ backgroundColor: "red" }}>
              Remove
            </Button>
          </Popconfirm>
          <Button type="primary">
            <Link to={`/admin/products/${record.id}/update`}>Update</Link>
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = props.products.map((item: IProduct) => {
    return {
      key: item.id,
      ...item,
    };
  });

  return (
    <div>
      <Button type="primary">
        <Link to={"/admin/products/add"}>Add New Product</Link>
      </Button>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ProductManagementPage;
