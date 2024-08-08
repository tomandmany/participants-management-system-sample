// @filename: /src/components/contents/TripleSelect.tsx
'use client';

import TripleSelectInterface from '@/components/Interfaces/TripleSelectInterface';
import updateProgram from '@/actions/programs/updateProgram';
import { useContext } from 'react';
import Context from '@/app/contexts/context';

type TripleSelectProps = {
    programId: string;
    options: { value: string, label: string }[];
    value: string;
    setHasUnsavedChanges: (value: boolean) => void;
    columnKey: string;
};

export default function TripleSelect({
    programId,
    columnKey,
    value: initialValue,
    setHasUnsavedChanges,
    options,
}: TripleSelectProps) {
    const context = useContext(Context);
    if (!context) {
        throw new Error('TableCell must be used within a Provider');
    }
    const { department } = context;

    const handleIconChange = async (newValue: string) => {
        const formData = new FormData();
        if (programId) {
            formData.append('id', programId);
        }
        formData.append(columnKey, newValue);
        if (department) {
            const response = await updateProgram(formData, department);
            setHasUnsavedChanges(false);
            if (!response.success) {
                console.error('Failed to update program:', response.error);
            } else {
                console.log('Program updated successfully:', response.data);
            }
        }
    };

    return (
        <TripleSelectInterface
            options={options}
            value={initialValue}
            columnKey={columnKey}
            onIconChange={handleIconChange}
        />
    );
}
