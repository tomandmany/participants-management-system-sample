// @filename: /src/app/_components/SelectableDropdownInterface.tsx
'use client';

import React from 'react';

type SelectableDropdownInterfaceProps = {
    value: string;
    options: string[];
    onChange: (value: string) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    label?: string;
    maxWidth?: number;
};

const SelectableDropdownInterface: React.FC<SelectableDropdownInterfaceProps> = ({
    value,
    options,
    onChange,
    onBlur,
    label,
    maxWidth,
}) => {
    return (
        <div className='w-full'>
            {label && <label className="block mb-1">{label}</label>}
            <select
                value={value}
                className='cursor-pointer rounded px-2 py-1 hover:bg-gray-100 hover:border-gray-600 border w-full'
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                style={{ minWidth: `${maxWidth}px` }}
            >
                {!value && <option value="">選択してください</option>}
                {options.map((option) => (
                    <option key={option} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default SelectableDropdownInterface;
