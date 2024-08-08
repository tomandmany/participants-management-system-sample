// src/components/ProgramImage.tsx
'use client';

import { ChangeEvent, RefObject, useContext, useEffect, useRef, useState } from "react";
import ProgramImageInterface from '@/components/Interfaces/ProgramImageInterface';
import createProgramImage from "@/actions/storages/programImages/createProgramImage";
import deleteProgramImage from "@/actions/storages/programImages/deleteProgramImage";
import Context from "@/app/contexts/context";
import { Button } from "@/components/ui/button";
import { PlusIcon, Trash2 } from "lucide-react";
import Image from "next/image";

type ProgramImageProps = {
    programId: string;
    participantId: string;
    imageUrl: string;
    tableCellRef: RefObject<HTMLDivElement>;
};

export default function ProgramImage({ programId, imageUrl: initialImageUrl, tableCellRef }: ProgramImageProps) {
    const context = useContext(Context);
    if (!context) {
        throw new Error('TableCell must be used within a Provider');
    }
    const { department } = context;

    const [imageUrl, setImageUrl] = useState<string | null>(initialImageUrl || null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const imageRef = useRef<HTMLImageElement>(null);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isHovered && imageRef.current && ref.current) {
            const imageRect = imageRef.current.getBoundingClientRect();
            const contentRect = ref.current.getBoundingClientRect();

            const top = imageRect.bottom;
            const left = imageRect.left + (imageRect.width / 2) - (contentRect.width / 2);

            setPosition({ top, left });
        }
    }, [isHovered]);

    const handleImageCreate = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        if (selectedFile) {
            const formData = new FormData();
            formData.append('id', programId);
            formData.append('file', selectedFile);

            setLoading(true);

            if (department) {
                const response = await createProgramImage(formData, department);

                if (response.success) {
                    setImageUrl(response.url!);
                    setError(null);
                } else {
                    setError('Failed to upload image');
                }

                setLoading(false);
            }
        }
    };

    const handleImageDelete = async () => {
        const fileName = imageUrl?.split('/').pop();
        if (!fileName) return;

        if (department) {
            const response = await deleteProgramImage(programId, fileName, department);

            if (response!.success) {
                setImageUrl(null);
                setError(null);
            } else {
                setError('Error deleting image');
            }
        }
    };

    const handleImageButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    return (
        <div className="mx-2" ref={ref}>
            <input
                ref={fileInputRef}
                type="file"
                onChange={handleImageCreate}
                className="hidden"
            />
            {!loading && !imageUrl && (
                <Button
                    variant="outline"
                    type='button'
                    className="p-2 mx-auto flex justify-center items-center gap-3 hover:border-gray-600"
                    onClick={handleImageButtonClick}
                >
                    <PlusIcon />
                    画像を追加する
                </Button>
            )}
            {loading ? (
                <div className='flex gap-3 items-center'>
                    <div className="w-[40px] aspect-square bg-gray-300 animate-pulse" />
                    <Button
                        variant="outline"
                        className="group cursor-pointer rounded mx-auto hover:border-red-600 hover:text-red-600 hover:bg-transparent transition p-2 gap-2"
                        type='button'
                        onClick={handleImageDelete}
                    >
                        <Trash2 />
                        <span>画像を削除する</span>
                    </Button>
                </div>
            ) : (
                imageUrl && (
                    <>
                        <div className='flex gap-3 items-center'>
                            <div
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                ref={imageRef}
                            >
                                <Image
                                    src={imageUrl}
                                    alt="Uploaded Image"
                                    width={40}
                                    height={40}
                                    className='w-[40px] aspect-square object-cover border-2 border-gray-700'
                                />
                                {isHovered && (
                                    <div
                                        className="bg-white p-10 absolute border border-gray-700"
                                        style={{ top: position.top, left: position.left }}
                                    >
                                        <Image
                                            src={imageUrl}
                                            alt="Uploaded Image"
                                            width={150}
                                            height={150}
                                            className='w-[150px] aspect-square object-cover border-2 border-gray-700'
                                        />
                                    </div>
                                )}
                            </div>
                            <Button
                                variant="outline"
                                className="group cursor-pointer rounded hover:border-red-600 hover:text-red-600 hover:bg-transparent transition p-2 gap-2"
                                type='button'
                                onClick={handleImageDelete}
                            >
                                <Trash2 />
                                <span>画像を削除する</span>
                            </Button>
                        </div>
                    </>

                )
            )}
            {error && <div className="text-red-600">{error}</div>}
        </div>
    );
}
