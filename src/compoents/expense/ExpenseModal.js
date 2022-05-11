import { DatePicker, InputNumber } from "antd";
import { Button, Modal, Input, Select, Form } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  selectExpense,
  addExpense,
  toggleModalVisibel,
} from "../../slice/expenseSlice";

const { Option } = Select;
export default function ExpenseModal() {
  const expense = useSelector(selectExpense);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  console.log(expense);
  const modalVisibile = useSelector((state) => state.expense.modalVisibile);
  const onFinish = () => {
    const values = form.getFieldsValue();
    // values.date = values.date.format("YYYY-MM-DD");
    dispatch(addExpense(values));
    form.submit();
    form.resetFields();
    setIsModalVisible(false);
    dispatch(toggleModalVisibel(false));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Button type="primary" onClick={() => dispatch(toggleModalVisibel(true))}>
        <PlusOutlined /> Chi Tiêu
      </Button>

      <Modal
        title="Thêm Chi Tiêu"
        visible={modalVisibile}
        onOk={onFinish}
        onCancel={() => dispatch(toggleModalVisibel(false))}
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
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
