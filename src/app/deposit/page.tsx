'use client';
import DepositChart from "@/components/Charts/DepositChart";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React from "react";

const DepositPage: React.FC = () => (
    <DefaultLayout>
        <DepositChart />
    </DefaultLayout>
);

export default DepositPage;