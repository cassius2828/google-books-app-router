"use client";

import { useState } from "react";

const PublicationDateInput = () => {
  const [mode, setMode] = useState<'anytime' | 'between'>('anytime');
  const [startMonth, setStartMonth] = useState<string>('');
  const [startYear, setStartYear] = useState<string>('');
  const [endMonth, setEndMonth] = useState<string>('');
  const [endYear, setEndYear] = useState<string>('');

  return (
    <div className="space-y-4">
      {/* Mode selection */}
      <div className="flex items-center space-x-6">
        <label className="inline-flex items-center text-xs">
          <input
            type="radio"
            name="pubDateMode"
            value="anytime"
            checked={mode === 'anytime'}
            onChange={() => setMode('anytime')}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2">Return content published anytime</span>
        </label>
        <label className="inline-flex items-center text-xs">
          <input
            type="radio"
            name="pubDateMode"
            value="between"
            checked={mode === 'between'}
            onChange={() => setMode('between')}
            className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-full"
          />
          <span className="ml-2">Return content published between</span>
        </label>
      </div>

      {/* Between fields */}
      {mode === 'between' && (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            name="startMonth"
            value={startMonth}
            onChange={(e) => setStartMonth(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <input
            type="text"
            name="startYear"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            placeholder="e.g. 2020"
            className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <span className="px-2">and</span>
          <select
            name="endMonth"
            value={endMonth}
            onChange={(e) => setEndMonth(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Month</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <input
            type="text"
            name="endYear"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            placeholder="e.g. 2021"
            className="px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </div>
  );
};

export default PublicationDateInput;