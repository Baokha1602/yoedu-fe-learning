import { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import type { Student } from '../types/student';
import { studentFields } from '../constants/studentFields';

interface Props {
  onClose: () => void;
  onSubmit: (values: Student) => void;
  editingStudent: Student | null;
}


const StudentModalAntd = ({ onClose, onSubmit, editingStudent }:
  Props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingStudent) {
      form.setFieldsValue(editingStudent);
    } else {
      form.resetFields();
    }
  }, [editingStudent, form]);

  const handleSubmit = (values: Student) => {
    onSubmit(values);
    onClose();
    console.log('Success', values);
  };

  return (
    <Modal open={true} onCancel={onClose} footer={null} width={600}>
      <Form layout="vertical" form={form} onFinish={handleSubmit} className="p-4">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h3 className="font-semibold">
            {editingStudent ? 'Sửa học viên' : 'Thêm học viên'}
          </h3>
        </div>

        {studentFields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={
              field.validate
                ? [
                  {
                    validator: (_, value) =>
                      field.validate && field.validate(value).condition
                        ? Promise.resolve()
                        : Promise.reject(field.validate && field.validate(value).message),
                  },
                ]
                : []
            }
          >
            <Input type={field.type || 'text'} />
          </Form.Item>
        ))}

        <div className="flex justify-end gap-2 border-t pt-4">
          <Button type="primary" htmlType="submit">
            {editingStudent ? 'Cập nhật' : 'Thêm mới'}
          </Button>
          <Button onClick={onClose}>Hủy</Button>
        </div>
      </Form>
    </Modal>
  );
};

export default StudentModalAntd;
