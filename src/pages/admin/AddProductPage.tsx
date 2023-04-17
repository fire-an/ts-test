import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"; //import useForm hook
import { IProduct } from "../../types/product";
import { Button, Form, Input, Modal, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
interface IProps {
  onAdd: (product: IProduct) => void;
}
// interface IFormInput {
//   id: number;
//   name: string;
//   price: number;
// }

const AddProductPage = (props: IProps) => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    const newProduct = {
      id: values.id,
      name: values.name,
      price: values.price,
      description: values.description,
      image: values.image,
    };
    props.onAdd(newProduct);
    alert("Thêm sản phẩm thành công");
    navigate("/admin/products");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[{ required: true, message: "Please input your price!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Image"
          name="image"
          rules={[{ required: true, message: "Please input your image!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Add New Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddProductPage;
