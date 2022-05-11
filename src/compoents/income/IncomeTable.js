import { Table, Tag, Space } from "antd";
import { Button } from "antd";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectIncome, removeIncome } from "../../slice/incomeSlice";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from "moment";

export default function ExpenseTable() {
  const income = useSelector(selectIncome);
 

  const dispatch = useDispatch();

  const columns = [
    {
      title: "Ngày",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("YYYY/MM/DD"),
    },
    {
      title: "Tên Thu Nhập",
      dataIndex: "name",
    },
    {
      title: "Số Tiền ",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Hữu Dụng",
      key: "isUsefull",
      dataIndex: "isUsefull",
      render: (isUsefull) => (
        <Tag color={isUsefull ? "green" : "red"}>
          {isUsefull ? "Có" : "Không"}
        </Tag>
      ),
    },

    {
      title: "Tác Vụ",
      render: (text, record) => (
        <Space  size="middle">
          <Link to={`/income/${text.id}`}>
          <Button type="primary">
            <EditOutlined />
            Sửa
          </Button>

          </Link>
          <Button
            type="primary"
            danger
            onClick={() => onRemoveExpense(text.id)}
          >
            <DeleteOutlined /> Xóa
          </Button>
        </Space>
      ),
    },
  ];

  const onRemoveExpense = (id) => {
    dispatch(removeIncome(id));
  };

  return (
    <div  >
      <Table  columns={columns} dataSource={income} />
    </div>
  );
}
