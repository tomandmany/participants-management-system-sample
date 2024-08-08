// src/app/contexts/provider.tsx
'use client';

import { useState, useCallback, useEffect } from 'react';
import ProgramContext from './context';
import { usePathname } from 'next/navigation';

type ProgramProviderProps = {
    children: React.ReactNode;
};

const ProgramProvider = ({ children }: ProgramProviderProps) => {
    const pathname = usePathname();
    const [department, setDepartment] = useState<Department | undefined>();

    useEffect(() => {
        if (pathname.startsWith('/programs')) {
            const pathSegment = pathname.split('/programs/')[1];
            setDepartment(pathSegment as Department);
        }
    }, [pathname]);

    const [maxWidths, setMaxWidths] = useState<{ [key: string]: number }>({});
    const [rowHeights, setRowHeights] = useState<{ [key: string]: number }>({});

    const memoizedSetMaxWidth = useCallback((header: string, width: number) => {
        setMaxWidths((prevMaxWidths) => {
            if (!prevMaxWidths[header] || width > prevMaxWidths[header]) {
                return { ...prevMaxWidths, [header]: width };
            }
            return prevMaxWidths;
        });
    }, []);

    const memoizedSetRowHeight = useCallback((participantId: string, height: number, prevHeight?: number) => {
        setRowHeights((prev) => {
            if (prevHeight !== undefined) {
                const newRowHeights = { ...prev, [participantId]: prevHeight };
                return newRowHeights;
            } else {
                return { ...prev, [participantId]: Math.max(prev[participantId] || 0, height) };
            }
        });
    }, []);

    return (
        <ProgramContext.Provider
            value={{
                department,
                // setTarget,
                maxWidths,
                setMaxWidth: memoizedSetMaxWidth,
                rowHeights,
                setRowHeight: memoizedSetRowHeight
            }}
        >
            {children}
        </ProgramContext.Provider>
    );
};

export default ProgramProvider;
