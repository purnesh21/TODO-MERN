import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  List,
  Modal,
  Space,
  TimePicker,
  Typography,
  message,
} from "antd";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SERVER } from "../../config";
import { useAppContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ToDos = () => {
  const [todos, setTodos] = useState([]);
  const [form] = Form.useForm();
  const [editingTodo, setEditingTodo] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editForm] = Form.useForm();
  const { token, handleLogout } = useAppContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) fetchTodos();
    else navigate("/");
  }, [token]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${SERVER}/todo`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data.todos);
    } catch (error) {
      console.error("Failed to fetch todos:", error);
      message.error("Failed to fetch todos");
    }
  };

  const handleAddTodo = async (values) => {
    try {
      setLoading(true);
      const newTodo = {
        title: values.title,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
      };
      const response = await axios.post(`${SERVER}/todo`, newTodo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos([response.data.data, ...todos]);
      form.resetFields();
      message.success("Todo added successfully");
    } catch (error) {
      console.error("Failed to add todo:", error);
      message.error("Failed to add todo");
    } finally {
      setLoading(false);
    }
  };

  const showEditModal = (todo) => {
    setEditingTodo(todo);
    editForm.setFieldsValue({
      title: todo.title,
      date: moment(todo.date, "YYYY-MM-DD"),
      time: moment(todo.time, "HH:mm"),
    });
    setIsModalVisible(true);
  };

  const handleEditTodo = async (values) => {
    try {
      const updatedTodo = {
        title: values.title,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
      };

      const response = await axios.put(`${SERVER}/todo`, updatedTodo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          todoId: editingTodo._id,
        },
      });

      setTodos(
        todos.map((todo) =>
          todo._id === editingTodo._id ? response.data.todo : todo
        )
      );
      setIsModalVisible(false);
      setEditingTodo(null);
      message.success("Todo updated successfully");
    } catch (error) {
      console.error("Failed to update todo:", error);
      message.error("Failed to update todo");
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${SERVER}/todo`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        params: {
          todoId: id,
        },
      });
      if (response.data.success) {
        setTodos(todos.filter((todo) => todo._id !== id));
        message.success("Todo deleted successfully");
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
      message.error("Failed to delete todo");
    }
  };

  const handleLogOut = async () => {
    handleLogout();
    navigate("/");
  };

  return (
    <div
      className="todo-container"
      style={{ maxWidth: "1000px", margin: "0 auto", padding: "2rem" }}
    >
      <Card
        title={
          <div className="flex justify-between items-center">
            <Title level={1}>ToDos</Title>
            <Button type="primary" onClick={handleLogOut}>
              Logout
            </Button>
          </div>
        }
        bordered={false}
      >
        <Form form={form} layout="vertical" onFinish={handleAddTodo}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Enter ToDo title" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <TimePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Add ToDo
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <List
        itemLayout="vertical"
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => showEditModal(item)}>
                Edit
              </Button>,
              <Button
                type="link"
                danger
                onClick={() => handleDeleteTodo(item._id)}
              >
                Delete
              </Button>,
            ]}
          >
            <Card hoverable>
              <Card.Meta
                description={
                  <>
                    <Title level={4}>{item.title}</Title>
                    <Space direction="vertical">
                      <Text>{`Scheduled on ${item.date} at ${item.time}`}</Text>
                    </Space>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
        style={{ marginTop: "20px" }}
      />

      <Modal
        title="Edit ToDo"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditTodo}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input placeholder="Enter ToDo title" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Time"
            name="time"
            rules={[{ required: true, message: "Please select a time" }]}
          >
            <TimePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update ToDo
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ToDos;
