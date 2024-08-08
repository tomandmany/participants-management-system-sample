import { Metadata } from "next";
import { getRoomPrograms } from "@/data/programs/roomPrograms";
import PageInterface from "@/components/Interfaces/PageInterface";
import PageSuspense from "@/components/PageSuspense";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "教室企画管理ページ",
    description: "教室企画の管理ページです。",
};

export default async function Page() {
    const programs = await getRoomPrograms();

    return (
        <Suspense fallback={<PageSuspense />}>
            <PageInterface programs={programs} heading="教室" />
        </Suspense>
    );
}
