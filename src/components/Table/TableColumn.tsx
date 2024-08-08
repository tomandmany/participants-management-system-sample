// app/components/TableColumn.tsx
import { ReactNode } from "react";

type TableColumnProps = {
    children: ReactNode;
    isFixed?: boolean;
}

export default function TableColumn({ children, isFixed }: TableColumnProps) {
    return (
        <div className={`min-w-max last:border-r-0 ${isFixed ? 'border-r-[3px] border-gray-300 sticky left-0 top-0': 'border-r' }`}>
            {children}
        </div>
    )
}
