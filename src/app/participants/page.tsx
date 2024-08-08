import { Metadata } from "next";
import PageInterface from "@/components/Interfaces/PageInterface";
import PageSuspense from "@/components/PageSuspense";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "参加団体管理ページ",
    description: "参加団体の管理ページです。",
};

export default async function Page() {

    return (
        <Suspense fallback={<PageSuspense />}>
            <PageInterface heading='参加団体' />
        </Suspense>
    );
}
