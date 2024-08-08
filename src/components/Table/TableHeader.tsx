// app/components/TableHeader.tsx
import { ReactNode } from "react";

interface TableHeaderProps {
    children: ReactNode;
}

export default function TableHeader({ children }: TableHeaderProps) {
    return <div className="font-bold p-4 border-b min-w-max bg-white text-center">{children}</div>;
}
