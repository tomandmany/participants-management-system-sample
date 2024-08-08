// src/app/programs/contexts/ProgramContext.tsx
'use client';

import { createContext } from 'react';

export type ProgramContextType = {
    department: Department | undefined;
    maxWidths: { [key: string]: number };
    setMaxWidth: (header: string, width: number) => void;
    rowHeights: { [key: string]: number };
    setRowHeight: (participantId: string, height: number, prevHeight?: number) => void;
};

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export default ProgramContext;
