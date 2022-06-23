import { Button, DatePicker, InputNumber } from "antd";
import { Input, Select, Form, notification } from "antd";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getExpense, updateExpense } from "../slice/expenseSlice";
import { CheckOutlined } from "@ant-design/icons";
const { Option } = Select;
export default function EditExpense() {
  let navigate = useNavigate();
  console.log(navigate);


  let { id } = useParams();
  console.log(id);
  const dispatch = useDispatch();

  const expense = useSelector((state) => getExpense(state, id));
  console.log(expense);
  const [form] = Form.useForm();

  form.setFieldsValue(expense);

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
    dispatch(updateExpense({ id, values }));
    openNotification();
    navigate("/expense");
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
          label="Tên Chi Phí"
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
        <Form.Item name="isUsefull" label="Hữu Dụng">
          <Select>
            <Option value={true}>Có</Option>
            <Option value={false}>Không</Option>
          </Select>
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
          <DatePicker format={"YYYY-MM-DD"} />
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
