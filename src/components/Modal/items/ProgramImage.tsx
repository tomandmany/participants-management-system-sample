// src/components/items/ProgramImage.tsx
'use client';

import { ChangeEvent, useRef, useState } from 'react';
import ProgramImageInterface from '@/components/Interfaces/ProgramImageInterface';

type ProgramImageProps = {
    onUploadSuccess: (file: File) => void;
};

export default function ProgramImage({ onUploadSuccess }: ProgramImageProps) {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageCreate = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile) {
            setLoading(true);
            setImageUrl(URL.createObjectURL(selectedFile));
            onUploadSuccess(selectedFile);
            setLoading(false);
        }
    };

    const handleImageDelete = () => {
        setImageUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleImageButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    return (
        <div className='w-full'>
            <label className="block mb-4">企画イメージ図</label>
            <ProgramImageInterface
                imageUrl={imageUrl}
                loading={loading}
                error={error}
                fileInputRef={fileInputRef}
                onImageCreate={handleImageCreate}
                onImageDelete={handleImageDelete}
                onImageButtonClick={handleImageButtonClick}
            />
        </div>
    );
}
