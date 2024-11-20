import { Label } from "../ui/label";
import { Input } from "../ui/input";

type InputFieldProps = {
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function InputField({ label, id, type, placeholder, value, onChange }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} type={type} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}
