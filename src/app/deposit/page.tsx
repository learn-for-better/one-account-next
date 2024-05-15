'use client';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Deposit } from "@/types/deposit";
import api from "@/utils/api";
import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic'

interface DepositPageProps {
    depositMap: Map<string, Deposit[]>;
}

const DynamicChart = dynamic(() => import('@/components/Charts/DepositChart'), { ssr: false });
const DynamicLineChart = dynamic(() => import('@/components/Charts/DepositLineChart'), { ssr: false });

const MyDepositChart = ({depositMap}: DepositPageProps) => {
    return (<div className="grid grid-cols-4 gap-4 md:gap-6 2xl:gap-7.5">
        <DynamicChart depositMap={depositMap} />
        <DynamicLineChart depositMap={depositMap} />
    </div>);
}

const DepositPage: React.FC = () => {
    const [data, setData] = useState<Map<string, Deposit[]>>(new Map());

    useEffect(() => {
        api.getDeposits().then(response => {
            const deposits = response.data;
            const depositMap: Map<string, Deposit[]> = new Map();
            deposits.forEach(deposit => {
                const dateStr = new Date(deposit.date).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                if (!depositMap.has(dateStr)) {
                    depositMap.set(dateStr, []);
                }
                depositMap.get(dateStr)?.push({ date: dateStr, amount: Number(deposit.amount), description: deposit.description });
            });
            setData(depositMap);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

    return (
        <DefaultLayout>
           {typeof window !== "undefined" && data.size > 0 && <MyDepositChart depositMap={data}/>}
        </DefaultLayout>
    );
}

export default DepositPage;