'use client';
import DepositChart from "@/components/Charts/DepositChart";
import DepositLineChart from "@/components/Charts/DepositLineChart";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Deposit } from "@/types/deposit";
import api from "@/utils/api";
import React, { useState, useEffect } from "react";

const DepositPage: React.FC = () => {
    const [depositMap, setDepositMap] = useState<Map<string, Deposit[]>>();

    useEffect(() => {
        api.getDeposits().then(response => {
            const deposits = response.data;
            const depositsByDate: Map<string, Deposit[]> = new Map();
            deposits.forEach(deposit => {
                const dateStr = new Date(deposit.date).toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
                if (!depositsByDate.has(dateStr)) {
                    depositsByDate.set(dateStr, []);
                }
                depositsByDate.get(dateStr)?.push({ date: dateStr, amount: Number(deposit.amount), description: deposit.description });
            });
            setDepositMap(depositsByDate);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }, [])

    return (
        <DefaultLayout>
            <div className="grid grid-cols-4 gap-4 md:gap-6 2xl:gap-7.5">
            {depositMap && <DepositChart depositMap={depositMap} />}
            {depositMap && <DepositLineChart depositMap={depositMap} />}
            </div>
        </DefaultLayout>
    );
}

export default DepositPage;