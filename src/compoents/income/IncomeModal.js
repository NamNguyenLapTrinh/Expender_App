import { DatePicker, InputNumber } from "antd";
import { Button, Modal, Input, Select, Form } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { selectIncome, addIncome } from "../../slice/incomeSlice";

export default function ExpenseModal() {
  const income = useSelector(selectIncome);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(income);

  const onFinish = () => {
    const values = form.getFieldsValue();
    values.date = values.date.format("YYYY-MM-DD");
    console.log(values);
    dispatch(addIncome(values));
    form.submit();
    form.resetFields();
    setIsModalVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        <PlusOutlined /> Thu Nhập
      </Button>

      <Modal
        title="Thêm Chi Tiêu"
        visible={isModalVisible}
        onOk={onFinish}
        onCancel={() => setIsModalVisible(false)}
      >
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
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Tên Thu Nhập"
            name="name"
            rules={[{ required: true, message: "Please input your income!" }]}
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
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
