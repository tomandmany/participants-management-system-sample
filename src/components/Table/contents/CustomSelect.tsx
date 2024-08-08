// src/components/contents/CustomSelect.tsx
'use client';

import { useId } from "react";

type CustomSelectProps = {
    value: string;
    options: string[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    maxWidth?: number;
    column?: { label: string, key: string };
};

const CustomSelect: React.FC<CustomSelectProps> = ({ value, options, onChange, onBlur, maxWidth }) => {
    const uniqueSelectId = useId();

    return (
        <select
            value={value}
            id={uniqueSelectId}
            name={uniqueSelectId}
            className='cursor-pointer rounded px-2 py-1 hover:bg-gray-100 hover:border-gray-600 border w-full'
            onChange={onChange}
            onBlur={onBlur}
            style={{ minWidth: `${maxWidth}px` }}
        >
            {!value && <option value="">選択してください</option>}
            {options.map((option) => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );
};

export default CustomSelect;
