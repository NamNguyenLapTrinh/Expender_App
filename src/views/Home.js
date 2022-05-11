import { Statistic, Row, Col, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectExpense } from "../slice/expenseSlice";
import { useMemo } from "react";
export default function Home() {
  let navigate = useNavigate();
  const expense = useSelector(selectExpense);
  const income = useSelector(state => state.income);
  console.log(income);
  console.log(expense);
  function handleClickIncome() {
    navigate("/income");
  }
  function handleClickExpense() {
    navigate("/expense");
  }
  const totalIncome = useMemo(() => {
    const results =  income.data.reduce((previousValue, currentValue) => previousValue + currentValue.amount,
      
    0)
    console.log('Imcone');
   return results
  },[income])

  const totalExpenses =  useMemo(() => {
    const results =  expense.reduce((previousValue, currentValue) => previousValue + currentValue.amount,
      
    0)
   return results
  },[expense])
  
  
  const totalKD = totalIncome - totalExpenses
  
  return (
    <div>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="Số Dư Khả Dụng" value={totalKD} />
        </Col>
        <Col span={6}>
          <Statistic title="Tổng Thu" value={totalIncome} precision={2} />
          <Button
            style={{ marginTop: 16 }}
            type="primary"
            onClick={handleClickIncome}
          >
            Thu Nhập
          </Button>
        </Col>
        <Col span={6}>
          <Statistic title="Tổng Chi" value={totalExpenses} precision={2} />
          <Button
            style={{ marginTop: 16 }}
            type="primary"
            onClick={handleClickExpense}
          >
            Chi Tiêu
          </Button>
        </Col>
        <Col span={6}>
          <Statistic title="Lãng Phí" value={200000} />
        </Col>
      </Row>
      ,
    </div>
  );
}

// "react-app/jest"
