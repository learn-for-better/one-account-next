'use client';
import DepositChart from "@/components/Charts/DepositChart";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Deposit } from "@/types/deposit";
import axios from "axios";
import React, { useState, useEffect } from "react";


const DepositPage: React.FC = () => {
    const [depositMap, setDepositMap] = useState<Map<string, Deposit[]>>(new Map());

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        axios.get<Deposit[]>(apiUrl + '/deposits').then(response => {
            const deposits = response.data.sort((a, b) => b.amount - a.amount);
            const depositsByDate: Map<string, Deposit[]> = new Map();
            deposits.forEach(deposit => {
                const dateObj = new Date(deposit.date);
                const dateStr = dateObj.toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit' });
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
    console.log('---page---\t',depositMap);
    return (
        <DefaultLayout>
            {depositMap.size > 0 && <DepositChart depositMap={depositMap} />}
        </DefaultLayout>
    );
}

export default DepositPage;