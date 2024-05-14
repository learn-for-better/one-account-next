import { Expense } from "@/components/Expenses";
import { Deposit } from "@/types/deposit";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const api = {
    getDeposits: () => axios.get<Deposit[]>(apiUrl + '/deposits'),
    getExpenses: () => axios.get(apiUrl + '/expenses'),
    postExpenses: (body: any) => axios.post<Expense>(apiUrl + '/expenses', body),
    getTags: () => axios.get(apiUrl + '/tags'),
}

export default api;