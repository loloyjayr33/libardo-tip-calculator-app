'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [bill, setBill] = useState<string>('');
  const [tipPercentage, setTipPercentage] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('');

  const tipPercentages = [5, 10, 15, 25, 50];

  const calculateTipAmount = (): number => {
    const billAmount = parseFloat(bill) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const tip = tipPercentage || parseFloat(customTip) || 0;
    
    if (billAmount === 0 || people === 0) return 0;
    
    return (billAmount * (tip / 100)) / people;
  };

  const calculateTotal = (): number => {
    const billAmount = parseFloat(bill) || 0;
    const people = parseInt(numberOfPeople) || 1;
    
    if (billAmount === 0 || people === 0) return 0;
    
    return (billAmount / people) + calculateTipAmount();
  };

  const handleReset = () => {
    setBill('');
    setTipPercentage(null);
    setCustomTip('');
    setNumberOfPeople('');
  };

  const handleTipSelection = (percentage: number) => {
    setTipPercentage(percentage);
    setCustomTip('');
  };

  const handleCustomTip = (value: string) => {
    setCustomTip(value);
    setTipPercentage(null);
  };

  return (
    <div className="min-h-screen bg-neutral-200 flex flex-col items-center justify-center p-4">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-[0.5em] text-center">
          S P L I<br />
          T T E R
        </h1>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-3xl p-8 w-full max-w-4xl shadow-lg">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Side - Input Section */}
          <div className="space-y-8">
            {/* Bill Input */}
            <div>
              <label className="block text-neutral-900 text-sm font-bold mb-2">
                Bill
              </label>
              <div className="relative">
                <Image
                  src="/images/icon-dollar.svg"
                  alt="Dollar icon"
                  width={16}
                  height={16}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full bg-neutral-50 text-right text-input text-neutral-900 font-bold px-4 py-3 pl-12 rounded-lg border-2 border-transparent focus:border-primary-400 focus:outline-none"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Tip Selection */}
            <div>
              <label className="block text-neutral-900 text-sm font-bold mb-4">
                Select Tip %
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {tipPercentages.map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleTipSelection(percentage)}
                    className={`py-3 px-4 rounded-lg font-bold text-input transition-colors ${
                      tipPercentage === percentage
                        ? 'bg-primary-400 text-neutral-900'
                        : 'bg-neutral-900 text-white hover:bg-neutral-200 hover:text-neutral-900'
                    }`}
                  >
                    {percentage}%
                  </button>
                ))}
                <input
                  type="number"
                  value={customTip}
                  onChange={(e) => handleCustomTip(e.target.value)}
                  className="bg-neutral-50 text-center text-input text-neutral-900 font-bold py-3 px-4 rounded-lg border-2 border-transparent focus:border-primary-400 focus:outline-none"
                  placeholder="Custom"
                />
              </div>
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-neutral-900 text-sm font-bold mb-2">
                Number of People
              </label>
              <div className="relative">
                <Image
                  src="/images/icon-person.svg"
                  alt="Person icon"
                  width={16}
                  height={16}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="number"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  className="w-full bg-neutral-50 text-right text-input text-neutral-900 font-bold px-4 py-3 pl-12 rounded-lg border-2 border-transparent focus:border-primary-400 focus:outline-none"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Results Section */}
          <div className="bg-neutral-900 rounded-2xl p-8 flex flex-col justify-between">
            <div className="space-y-6">
              {/* Tip Amount */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white text-sm font-bold">Tip Amount</div>
                  <div className="text-neutral-400 text-xs">/ person</div>
                </div>
                <div className="text-primary-400 text-4xl font-bold">
                  ${calculateTipAmount().toFixed(2)}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white text-sm font-bold">Total</div>
                  <div className="text-neutral-400 text-xs">/ person</div>
                </div>
                <div className="text-primary-400 text-4xl font-bold">
                  ${calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="w-full bg-primary-400 text-neutral-900 font-bold py-3 rounded-lg mt-8 hover:bg-primary-400/80 transition-colors"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}