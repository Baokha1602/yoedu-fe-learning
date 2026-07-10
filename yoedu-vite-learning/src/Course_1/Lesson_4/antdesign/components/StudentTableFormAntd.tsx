import { Table, Button, Popconfirm, Tag, Input } from 'antd';
import type { Student } from '../types/student';

interface Props {
  students: Student[];
  onEdit: (record: Student) => void;
  onDelete: (id: string) => void;
  search: string;
  onSearch: (value: string) => void;
}

const getRank = (score: number) => {
  if (score >= 8) return "Giỏi";
  if (score >= 6.5) return "Khá";
  if (score >= 5) return "Trung bình";
  return "Yếu";
};

const getBadgeColor = (rank: string) => {
  if (rank === "Giỏi") return "green";
  if (rank === "Khá") return "blue";
  if (rank === "Trung bình") return "orange";
  return "red";
};

const StudentTableFormAntd = ({ students, onEdit, onDelete, search, onSearch }: Props) => {
  return (
    <div>
      <div className="mb-4">
        <Input.Search
          placeholder="Tìm kiếm..."
          allowClear
          enterButton
          size="large"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={{ width: '100%', maxWidth: '400px' }}
        />
      </div>

      <div className="overflow-x-auto">
        <Table dataSource={students} rowKey="id" pagination={{ pageSize: 5 }} bordered>
          <Table.Column title="Họ tên học viên" dataIndex="name" key="name" />
          <Table.Column title="Phụ huynh" dataIndex="parent" key="parent" />
          <Table.Column title="SĐT" dataIndex="phone" key="phone" />
          <Table.Column
            title="Học lực"
            key="rank"
            render={(_, record: Student) => {
              const rank = getRank(record.score);
              return <Tag color={getBadgeColor(rank)}>{rank}</Tag>;
            }}
          />
          <Table.Column title="Điểm" dataIndex="score" key="score" />
          <Table.Column
            title="Actions"
            key="actions"
            align="center"
            render={(_, record: Student) => (
              <div className="flex gap-4 justify-center">
                <Button type="primary" onClick={() => onEdit(record)}>
                  Edit
                </Button>
                <Popconfirm
                  title="Bạn có chắc chắn muốn xóa học sinh này không?"
                  onConfirm={() => onDelete(record.id)}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Button danger>Delete</Button>
                </Popconfirm>
              </div>
            )}
          />
        </Table>
      </div>
    </div>
  );
};

export default StudentTableFormAntd;
