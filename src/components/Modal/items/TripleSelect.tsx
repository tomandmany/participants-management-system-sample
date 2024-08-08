// @filename: /app/components/items/TripleSelect.tsx
'use client';

import TripleSelectInterface from '@/components/Interfaces/TripleSelectInterface';

type TripleSelectProps = {
    column: { label: string, key: string };
    value: string;
    options: { value: string, label: string }[];
    onInputChange?: (key: string, value: string) => void;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
};

export default function TripleSelect({
    column,
    value,
    options,
    onInputChange,
    onChange,
    onBlur
}: TripleSelectProps) {

    const handleIconChange = (newValue: string) => {
        if (onInputChange && column) {
            onInputChange(column.key, newValue);
        }
        if (onChange && onBlur) {
            onChange({ target: { value: newValue } } as React.ChangeEvent<HTMLSelectElement>);
            onBlur({ target: { value: newValue } } as React.FocusEvent<HTMLSelectElement>);
        }
    };

    return (
        <div className='w-full'>
            {column && <label className="block mb-4">{column.label}</label>}
            <TripleSelectInterface
                options={options}
                value={value}
                columnKey={column.key}
                onIconChange={handleIconChange}
            />
        </div>
    );
}
