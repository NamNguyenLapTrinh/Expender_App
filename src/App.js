import React, { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  BrowserRouter,
  useLocation,
} from "react-router-dom";
import { Home, Expense, Income, EditExpense , EditIncome } from "./views";
import { Layout, Menu, Breadcrumb } from "antd";

function App() {
  const { Header, Content, Footer } = Layout;
  const location = useLocation();

  return (
    <Layout className="layout">
      <Header>
        <div className="logo">EXPENDER</div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
          <Menu.Item key="/">
            <Link to="/">HOME</Link>
          </Menu.Item>
          <Menu.Item key="/income">
            <Link to="/income">INCOME</Link>
          </Menu.Item>
          <Menu.Item key="/expense">
            <Link to="/expense">EXPENSE</Link>
          </Menu.Item>
        </Menu>
      </Header>

      <Content style={{ padding: "0 50px" }}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>

        <div className="site-layout-content">
          <div>
            <Routes>
              <Route path="expense" element={<Expense />}></Route>
              <Route path="expense/:id" element={<EditExpense />} />

              <Route exact path="/income" element={<Income />} />
              <Route path="income/:id" element={<EditIncome />} />


              <Route exact path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
