"use client";
import api from "@/utils/api";
import React, { FormEvent, useEffect, useState } from "react";

export interface Tag {
    id: number;
    name: string;
}
export interface Expense {
    id: number;
    date: string;
    description: string;
    amount: number;
    tags: Tag[];
}

const Expenses: React.FC = () => {
    const [formKey, setFormKey] = useState<number>(0);
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [existedTags, setExistedTags] = useState<Tag[]>([]);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    

    const refreshExpense = () => api.getExpenses()
        .then(response => {
            setExpenses(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });

    const refreshTags = () => api.getTags().then(response => {
        setExistedTags(response.data);
    }).catch(error => {
        console.error('Error fetching data:', error);
    });

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const description = formData.get('description');
        const amount = Number(formData.get('amount'));
        const tags = formData.getAll('new-tags');
        if (!description || !amount) {
            alert('Please fill in all fields');
            return;
        }
        api.postExpenses({
            description: description,
            amount: amount,
            tags: tags
        }).then(response => {
            refreshExpense().then(() => {
                refreshTags();
            });
        })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    const onChangeNewTags = () => {
        const newTags = document.getElementById('new-tags') as HTMLInputElement;
        const tags = newTags.value.split(',').map(tag => tag.trim());
        setSelectedTags(tags.map(tag => ({ id: -1, name: tag })));
    }



    useEffect(() => {
        refreshExpense();
        refreshTags();
    }, [])

    const clickTag = (tag: Tag) => {
        if (selectedTags.find(t => t.id === tag.id)) {
            setSelectedTags(selectedTags.filter(t => t.id !== tag.id));
            return;
        }
        else {
            setSelectedTags([...selectedTags, tag])

        }
    }

    const clickClearButton = () => {
        setFormKey(prevKey => prevKey + 1);
        setSelectedTags([]);
    }

    return (
        <>
            <form key={formKey} onSubmit={onSubmit}>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900 dark:text-white">Add Expenses</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-white">demo</p>
                        <div className="mt-10 grid md:grid-cols-6 gap-x-6 gap-y-8 sm:grid-cols-1">
                            <div >
                                <h2>Choose tags</h2>
                                <ul className="flex flex-wrap gap-2 pt-4 text-sm text-sky-600 *:rounded-full *:border *:border-sky-100 *:bg-sky-50 *:px-2 *:py-0.5 dark:text-sky-300 dark:*:border-sky-500/15 dark:*:bg-sky-500/10">
                                    {existedTags.map(tag => (
                                        <li key={tag.id} className=" hover:bg-blue-100 active:bg-blue-300">
                                            <button type="button" className="focus:outline-none" onClick={() => clickTag(tag)}>{tag.name}</button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="sm:col-span-2 sm:col-start-1">
                                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    description
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="description"
                                        id="description"
                                        autoComplete="description"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:border-strokedark dark:bg-boxdark dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="amount" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    amount
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="amount"
                                        id="amount"
                                        autoComplete="amount"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:border-strokedark dark:bg-boxdark dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="new-tags" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                                    new tags
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="new-tags"
                                        id="new-tags"
                                        autoComplete="new-tags"
                                        value={selectedTags.map(tag => tag.name).join(', ')}
                                        onChange={() => onChangeNewTags()}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:border-strokedark dark:bg-boxdark dark:text-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900" onClick={() => clickClearButton()}>
                        Clear
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add
                    </button>
                </div>
            </form>
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Description
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            Tags
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {expenses && expenses.map((expense) => (
                        <tr key={expense.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{expense.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{expense.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{expense.tags.map(tag => tag.name).join(', ')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}


export default Expenses;