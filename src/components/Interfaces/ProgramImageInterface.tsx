// src/components/items/ProgramImageInterface.tsx
'use client';

import { ChangeEvent, RefObject, useRef, useState } from 'react';
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";

type ProgramImageInterfaceProps = {
    imageUrl: string | null;
    loading: boolean;
    error: string | null;
    fileInputRef: RefObject<HTMLInputElement>;
    onImageCreate: (event: ChangeEvent<HTMLInputElement>) => void;
    onImageDelete: () => void;
    onImageButtonClick: () => void;
};

export default function ProgramImageInterface({
    imageUrl,
    loading,
    error,
    fileInputRef,
    onImageCreate,
    onImageDelete,
    onImageButtonClick
}: ProgramImageInterfaceProps) {

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                onChange={onImageCreate}
                className="hidden"
            />
            {!loading && !imageUrl && (
                <Button
                    variant="outline"
                    type='button'
                    className="p-2 mx-auto flex justify-center items-center gap-3 hover:border-gray-600"
                    onClick={onImageButtonClick}
                >
                    <PlusIcon />
                    画像を追加する
                </Button>
            )}
            {loading ? (
                <div className='flex flex-col gap-4 items-center'>
                    <div className="w-[150px] aspect-square bg-gray-300 animate-pulse mt-4" />
                    <Button
                        variant="outline"
                        className="group cursor-pointer rounded mx-auto hover:border-red-600 hover:bg-transparent transition p-2"
                        type='button'
                        onClick={onImageDelete}
                    >
                        <Trash2 className="group-hover:text-red-600" />
                    </Button>
                </div>
            ) : (
                imageUrl && (
                    <div className='flex flex-col gap-4 items-center'>
                        <Image
                            src={imageUrl}
                            alt="Uploaded Image"
                            width={200}
                            height={200}
                            className='w-[150px] aspect-square object-cover border-2 border-gray-700'
                        />
                        <Button
                            variant="outline"
                            className="group cursor-pointer rounded hover:border-red-600 hover:bg-transparent transition p-2"
                            type='button'
                            onClick={onImageDelete}
                        >
                            <Trash2 className="group-hover:text-red-600" />
                        </Button>
                    </div>
                )
            )}
            {error && <div className="text-red-600">{error}</div>}
        </>
    );
}
