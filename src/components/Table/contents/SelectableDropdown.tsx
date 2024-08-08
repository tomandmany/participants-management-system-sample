// @filename: /src/components/contents/SelectableDropdown.tsx
'use client';

import { useId } from "react";
import SelectableDropdownInterface from '@/components/Interfaces/SelectableDropdownInterface';

type SelectableDropdownProps = {
    value: string;
    options: string[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
    maxWidth?: number;
    column?: { label: string, key: string };
};

const SelectableDropdown: React.FC<SelectableDropdownProps> = ({ value, options, onChange, onBlur, maxWidth }) => {
    const uniqueSelectId = useId();

    return (
        <SelectableDropdownInterface
            value={value}
            options={options}
            onChange={(v) => onChange({ target: { value: v } } as React.ChangeEvent<HTMLSelectElement>)}
            onBlur={onBlur}
            maxWidth={maxWidth}
        />
    );
};

export default SelectableDropdown;