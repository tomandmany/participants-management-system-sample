// @filename: /components/items/InputItem.tsx
'use client'

import { ChangeEvent, KeyboardEvent, useState } from 'react';

type InputItemProps = {
    column: { label: string, key: string };
    onInputChange: (key: string, value: string | File) => void;
};

export default function InputItem({ column, onInputChange }: InputItemProps) {
    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.files ? e.target.files[0] : e.target.value;
        setInputValue(value as string);
        onInputChange(column.key, value);
    };

    const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.metaKey && e.key === 'Enter') || (e.ctrlKey && e.key === 'Enter')) {
            const target = e.target as HTMLInputElement;
            target.blur(); // Blur the input to trigger the handleBlur event
        }
    };

    return (
        <div className='w-full'>
            <label className="block mb-1">{column.label}</label>
            <input
                type="text"
                id={`${column.key}`}
                name={`${column.key}`}
                value={inputValue}
                placeholder={`${column.label}を入力してください`}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="w-full p-2 border rounded"
                required
            />
        </div>
    );
}
