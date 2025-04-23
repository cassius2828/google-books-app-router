"use client";

import { useState } from "react";

export interface AdvancedSearchParams {
  filter: string;
  langRestrict: string;
  orderBy: string;
  printType: string;
  q: string;
  volumeId: string;
  author: string;
  title: string;
  publisher: string;
  subject: string;
}

type AdvancedSearchProps = {
  onSearch?: (params: AdvancedSearchParams) => void;
};

export default function AdvancedSearch({ onSearch }: AdvancedSearchProps) {
  const [params, setParams] = useState<AdvancedSearchParams>({
    filter: "",
    langRestrict: "",
    orderBy: "relevance",
    printType: "all",
    q: "",
    volumeId: "",
    author: "",
    title: "",
    publisher: "",
    subject: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(params);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md space-y-6 mt-20"
    >
      <h2 className="text-2xl font-bold text-gray-800">Advanced Search</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label htmlFor="q" className="block text-sm font-medium text-gray-700">
            Query
          </label>
          <input
            type="text"
            name="q"
            id="q"
            value={params.q}
            onChange={handleChange}
            placeholder="Search terms..."
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
            Filter
          </label>
          <select
            name="filter"
            id="filter"
            value={params.filter}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="ebooks">eBooks</option>
            <option value="free-ebooks">Free eBooks</option>
            <option value="paid-ebooks">Paid eBooks</option>
            <option value="full">Full</option>
            <option value="partial">Partial</option>
          </select>
        </div>
        <div>
          <label htmlFor="langRestrict" className="block text-sm font-medium text-gray-700">
            Language
          </label>
          <select
            name="langRestrict"
            id="langRestrict"
            value={params.langRestrict}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Any</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
        <div>
          <label htmlFor="orderBy" className="block text-sm font-medium text-gray-700">
            Order By
          </label>
          <select
            name="orderBy"
            id="orderBy"
            value={params.orderBy}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
        <div>
          <label htmlFor="printType" className="block text-sm font-medium text-gray-700">
            Print Type
          </label>
          <select
            name="printType"
            id="printType"
            value={params.printType}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="books">Books</option>
            <option value="magazines">Magazines</option>
          </select>
        </div>
        <div>
          <label htmlFor="volumeId" className="block text-sm font-medium text-gray-700">
            Volume ID
          </label>
          <input
            type="text"
            name="volumeId"
            id="volumeId"
            value={params.volumeId}
            onChange={handleChange}
            placeholder="e.g. F387XHkcflwC"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={params.author}
            onChange={handleChange}
            placeholder="Author name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={params.title}
            onChange={handleChange}
            placeholder="Book title"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="publisher" className="block text-sm font-medium text-gray-700">
            Publisher
          </label>
          <input
            type="text"
            name="publisher"
            id="publisher"
            value={params.publisher}
            onChange={handleChange}
            placeholder="Publisher name"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            type="text"
            name="subject"
            id="subject"
            value={params.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="text-right">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
}
