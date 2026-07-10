import { useState, useMemo } from 'react';
import { Table, Button, Modal, Form, Input, Space, Popconfirm, message, InputNumber, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import type { Course } from '../types/course';

const { Option } = Select;

const CourseAntd = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [searchText, setSearchText] = useState("");
  const [form] = Form.useForm();

  const filteredCourses = useMemo(() => {
    if (!searchText.trim()) return courses;
    const lowerSearch = searchText.toLowerCase();
    return courses.filter(
      (c) =>
        c.name.toLowerCase().includes(lowerSearch) ||
        c.code.toLowerCase().includes(lowerSearch) ||
        c.instructor.toLowerCase().includes(lowerSearch)
    );
  }, [courses, searchText]);

  const handleOpenAdd = () => {
    setEditingCourse(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOpenEdit = (record: Course) => {
    setEditingCourse(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
    message.success('Đã xóa khóa học thành công');
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      if (editingCourse) {
        setCourses(courses.map(c => c.id === editingCourse.id ? { ...c, ...values } : c));
        message.success('Cập nhật khóa học thành công');
      } else {
        const newCourse = { ...values, id: Date.now() };
        setCourses([...courses, newCourse]);
        message.success('Thêm khóa học thành công');
      }
      setIsModalVisible(false);
    }).catch(info => {
      console.log('Validate Failed:', info);
    });
  };

  const columns = [
    {
      title: 'Mã',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Tên Khóa Học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giảng Viên',
      dataIndex: 'instructor',
      key: 'instructor',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => `${price.toLocaleString()} VND`,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = status === 'active' ? 'green' : status === 'pending' ? 'orange' : 'red';
        let text = status === 'active' ? 'Hoạt động' : status === 'pending' ? 'Chờ duyệt' : 'Đã đóng';
        return <span style={{ color, fontWeight: 'bold' }}>{text}</span>;
      }
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Course) => (
        <Space size="middle">
          <Button type="primary" ghost icon={<EditOutlined />} size="small" onClick={() => handleOpenEdit(record)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa khóa học này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Đồng ý"
            cancelText="Hủy"
          >
            <Button danger icon={<DeleteOutlined />} size="small">Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 m-0">Quản lý Khóa học (Antd)</h1>
        <div className="flex gap-4">
          <Input 
            placeholder="Tìm kiếm khóa học..." 
            prefix={<SearchOutlined />} 
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
            style={{ width: 250 }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleOpenAdd}>
            Thêm mới
          </Button>
        </div>
      </div>

      <Table 
        columns={columns} 
        dataSource={filteredCourses} 
        rowKey="id" 
        pagination={{ pageSize: 5 }} 
        bordered
      />

      <Modal
        title={editingCourse ? "Cập nhật khóa học" : "Thêm khóa học mới"}
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        okText={editingCourse ? "Cập nhật" : "Thêm"}
        cancelText="Hủy"
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item 
            name="code" 
            label="Mã khóa học" 
            rules={[{ required: true, message: 'Vui lòng nhập mã khóa học!' }]}
          >
            <Input placeholder="Nhập mã khóa học (vd: RE01)" />
          </Form.Item>
          <Form.Item 
            name="name" 
            label="Tên khóa học" 
            rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
          >
            <Input placeholder="Nhập tên khóa học" />
          </Form.Item>
          <Form.Item 
            name="instructor" 
            label="Giảng viên" 
            rules={[{ required: true, message: 'Vui lòng nhập tên giảng viên!' }]}
          >
            <Input placeholder="Nhập tên giảng viên" />
          </Form.Item>
          <Form.Item 
            name="price" 
            label="Giá khóa học" 
            rules={[{ required: true, message: 'Vui lòng nhập giá khóa học!' }]}
          >
            <InputNumber placeholder="Nhập giá khóa học" style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item 
            name="status" 
            label="Trạng thái" 
            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
            initialValue="active"
          >
            <Select>
              <Option value="active">Hoạt động</Option>
              <Option value="pending">Chờ duyệt</Option>
              <Option value="closed">Đã đóng</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CourseAntd;
