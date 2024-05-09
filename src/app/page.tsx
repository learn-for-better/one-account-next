import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Expenses from "@/components/Expenses";

export const metadata: Metadata = {
  title:
    "one-account-nextjs - TailAdmin Dashboard Template Home Page",
  description: "This is the home page of one-account-nextjs - TailAdmin Dashboard Template",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Expenses />
      </DefaultLayout>
    </>
  );
}
