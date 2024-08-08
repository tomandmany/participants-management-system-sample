// @filename: /src/app/_components/items/SelectableDropdown.tsx
'use client';

import SelectableDropdownInterface from '@/components/Interfaces/SelectableDropdownInterface';

type SelectableDropdownProps = {
    value: string;
    column: { label: string, key: string };
    options: string[];
    onChange: (value: string) => void;
};

const SelectableDropdown: React.FC<SelectableDropdownProps> = ({ column, value, options, onChange }) => {
    return (
        <SelectableDropdownInterface
            value={value}
            options={options}
            onChange={onChange}
            label={column.label}
        />
    );
};

export default SelectableDropdown;
