import type { Student } from "../types/student";

export const studentFields: {
  name: keyof Student;
  label: string;
  type?: string;
  validate?: (value: string) => { condition: boolean; message: string };
}[] = [
  {
    name: "name",
    label: "Họ tên",
    validate: (value) => ({
      condition: !!value,
      message: "Họ tên không được để trống",
    }),
  },
  {
    name: "parent",
    label: "Phụ huynh",
    validate: (value) => ({
      condition: !!value,
      message: "Phụ huynh không được để trống",
    }),
  },
  {
    name: "phone",
    label: "SĐT",
    validate: (value) => ({
      condition: !!value,
      message: "SĐT không được để trống",
    }),
  },
  {
    name: "score",
    label: "Điểm",
    type: "number",
  },
  
];
