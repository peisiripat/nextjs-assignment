import { Button, ButtonProps } from "@mui/material";

export interface CustomBottomProps extends ButtonProps {
  label: string;
  onPressed: VoidFunction;
}

export default function CustomButton({ ...props }: CustomBottomProps) {
  return <Button>{props.name}</Button>;
}
