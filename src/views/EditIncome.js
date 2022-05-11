import { Button, DatePicker, InputNumber } from "antd";
import { Input, Select, Form, notification } from "antd";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getIncome, updateIncome } from "../slice/incomeSlice";
import { CheckOutlined } from "@ant-design/icons";

export default function EditIncome() {
  let navigate = useNavigate();
  
  let { id } = useParams();

  console.log(id);
  const income = useSelector((state) => getIncome(state, id));
  console.log(income);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  form.setFieldsValue(income);
  const openNotification = () => {
    notification.open({
      description: (
        <>
          Đã Cập Nhập Thành Công{" "}
          <CheckOutlined style={{ color: "green", fontSize: "30px" }} />
        </>
      ),
      onClick: () => {
        console.log("Notification Clicked!");
      },
    });
  };
  const onFinish = (values) => {
    dispatch(updateIncome({ id, values }));
    openNotification();
    navigate("/income");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên Thu Nhập"
          name="name"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số Tiền"
          name="amount"
          rules={[
            {
              type: "number",
              min: 0,
            },
          ]}
        >
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Ngày"
          name="date"
          rules={[
            {
              type: "object",
              required: true,
              message: "Please select time!",
            },
          ]}
        >
          <DatePicker format={ "YYYY-MM-DD"} />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
