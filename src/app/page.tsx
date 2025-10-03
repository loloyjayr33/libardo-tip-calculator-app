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

  const isResetDisabled = !bill && !tipPercentage && !customTip && !numberOfPeople;

  return (
    <div className="min-h-screen bg-light-grayish-cyan flex items-center justify-center p-6 font-space-mono">
      {/* Main Container - Compact design matching the new image */}
      <div className="bg-white rounded-3xl p-6 w-full max-w-[850px] shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Left Container - Input Section */}
          <div className="space-y-6">
            {/* Bill Input Container */}
            <div>
              <label className="block text-dark-grayish-cyan text-base font-bold mb-2">
                Bill
              </label>
              <div className="relative">
                <Image
                  src="/images/icon-dollar.svg"
                  alt="Dollar"
                  width={20}
                  height={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full bg-very-light-grayish-cyan text-right text-2xl text-very-dark-cyan font-bold px-4 py-3 pl-12 rounded-lg border-2 border-transparent focus:border-strong-cyan focus:outline-none hover:border-strong-cyan cursor-pointer"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Tip Selection Container */}
            <div>
              <label className="block text-dark-grayish-cyan text-base font-bold mb-3">
                Select Tip %
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {tipPercentages.map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleTipSelection(percentage)}
                    className={`py-3 px-4 rounded-lg font-bold text-xl transition-colors min-h-[50px] ${tipPercentage === percentage
                        ? 'bg-strong-cyan text-very-dark-cyan'
                        : 'bg-very-dark-cyan text-white hover:bg-strong-cyan hover:text-very-dark-cyan'
                      }`}
                  >
                    {percentage}%
                  </button>
                ))}
                <input
                  type="number"
                  value={customTip}
                  onChange={(e) => handleCustomTip(e.target.value)}
                  className="bg-very-light-grayish-cyan text-center text-xl text-very-dark-cyan font-bold py-3 px-4 rounded-lg border-2 border-transparent focus:border-strong-cyan focus:outline-none placeholder-grayish-cyan hover:border-strong-cyan cursor-pointer min-h-[50px]"
                  placeholder="Custom"
                />
              </div>
            </div>

            {/* Number of People Container */}
            <div>
              <label className="block text-dark-grayish-cyan text-base font-bold mb-2">
                Number of People
              </label>
              <div className="relative">
                <Image
                  src="/images/icon-person.svg"
                  alt="Person"
                  width={20}
                  height={20}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type="number"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  className="w-full bg-very-light-grayish-cyan text-right text-2xl text-very-dark-cyan font-bold px-4 py-3 pl-12 rounded-lg border-2 border-transparent focus:border-strong-cyan focus:outline-none hover:border-strong-cyan cursor-pointer"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Right Container - Results Panel */}
          <div className="bg-very-dark-cyan rounded-2xl p-6 flex flex-col justify-between min-h-[350px]">
            <div className="space-y-8">
              {/* Tip Amount Display */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white text-base font-bold">Tip Amount</div>
                  <div className="text-grayish-cyan text-sm">/ person</div>
                </div>
                <div className="text-strong-cyan text-4xl font-bold">
                  ${calculateTipAmount().toFixed(2)}
                </div>
              </div>

              {/* Total Display */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white text-base font-bold">Total</div>
                  <div className="text-grayish-cyan text-sm">/ person</div>
                </div>
                <div className="text-strong-cyan text-4xl font-bold">
                  ${calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              disabled={isResetDisabled}
              className={`w-full font-bold py-3 rounded-lg mt-6 transition-colors uppercase tracking-wider text-lg ${isResetDisabled
                  ? 'bg-very-dark-cyan text-grayish-cyan cursor-not-allowed opacity-30'
                  : 'bg-strong-cyan text-very-dark-cyan hover:bg-[hsl(172,67%,65%)]'
                }`}
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}