'use client';
import DepositChart from "@/components/Charts/DepositChart";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Deposit } from "@/types/deposit";
import React from "react";

const deposits: Deposit[] = [{ date: '2024-05-11T01:13:26.757Z', description: '支付宝', amount: 1000.55 },
{ date: '2024-05-11T01:13:26.757Z', description: '微信', amount: 1500.90 },
{ date: '2024-05-11T01:13:26.757Z', description: '现金', amount: 100.10 },
{ date: '2024-05-12T01:13:26.757Z', description: '招商银行', amount: 10000.10 }
]

const DepositPage: React.FC = () => {

    return (
        <DefaultLayout>
            <DepositChart deposits={deposits.sort((a, b) => b.amount - a.amount)} />
        </DefaultLayout>
    );
}

export default DepositPage;