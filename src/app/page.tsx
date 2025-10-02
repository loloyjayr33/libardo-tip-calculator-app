'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [bill, setBill] = useState<string>('142.55');
  const [tipPercentage, setTipPercentage] = useState<number | null>(15);
  const [customTip, setCustomTip] = useState<string>('');
  const [numberOfPeople, setNumberOfPeople] = useState<string>('5');

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
    <div className="min-h-screen bg-light-grayish-cyan flex flex-col items-center justify-center p-6 font-space-mono">
      {/* Logo */}
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-very-dark-cyan tracking-[0.4em] text-center leading-[1.2]">
          S P L I<br />
          T T E R
        </h1>
      </div>

      {/* Calculator Card */}
      <div className="bg-white rounded-3xl p-8 w-full max-w-[920px] shadow-xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Input Section */}
          <div className="space-y-8">
            {/* Bill Input */}
            <div>
              <label className="block text-dark-grayish-cyan text-base font-bold mb-2">
                Bill
              </label>
              <div className="relative">
                <Image
                  src="/images/icon-dollar.svg"
                  alt="Dollar icon"
                  width={16}
                  height={16}
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10"
                />
                <input
                  type="number"
                  value={bill}
                  onChange={(e) => setBill(e.target.value)}
                  className="w-full bg-very-light-grayish-cyan text-right text-input text-very-dark-cyan font-bold px-5 py-4 pl-14 rounded-lg border-2 border-transparent focus:border-strong-cyan focus:outline-none placeholder-grayish-cyan"
                  placeholder="0"
                />
              </div>
            </div>

            {/* Tip Selection */}
            <div>
              <label className="block text-dark-grayish-cyan text-base font-bold mb-4">
                Select Tip %
              </label>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {tipPercentages.map((percentage) => (
                  <button
                    key={percentage}
                    onClick={() => handleTipSelection(percentage)}
                    className={`py-3 px-6 rounded-lg font-bold text-input transition-all duration-200 ${tipPercentage === percentage
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
                  className="bg-very-light-grayish-cyan text-center text-input text-very-dark-cyan font-bold py-3 px-6 rounded-lg border-2 border-transparent focus:border-strong-cyan focus:outline-none placeholder-grayish-cyan"
                  placeholder="Custom"
                />
              </div>
            </div>

            {/* Number of People */}
            <div>
              <label className="block text-dark-grayish-cyan text-base font-bold mb-2">
                Number of People
              </label>
              <div className="relative">
                <Image
                  src="/images/icon-person.svg"
                  alt="Person icon"
                  width={16}
                  height={16}
                  className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10"
                />
                <input
                  type="number"
                  value={numberOfPeople}
                  onChange={(e) => setNumberOfPeople(e.target.value)}
                  className="w-full bg-very-light-grayish-cyan text-right text-input text-very-dark-cyan font-bold px-5 py-4 pl-14 rounded-lg border-2 border-transparent focus:border-strong-cyan focus:outline-none placeholder-grayish-cyan"
                  placeholder="0"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Results Section */}
          <div className="bg-very-dark-cyan rounded-2xl p-8 flex flex-col justify-between min-h-[416px]">
            <div className="space-y-10">
              {/* Tip Amount */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white text-base font-bold">Tip Amount</div>
                  <div className="text-grayish-cyan text-sm">/ person</div>
                </div>
                <div className="text-strong-cyan text-5xl font-bold">
                  ${calculateTipAmount().toFixed(2)}
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-white text-base font-bold">Total</div>
                  <div className="text-grayish-cyan text-sm">/ person</div>
                </div>
                <div className="text-strong-cyan text-5xl font-bold">
                  ${calculateTotal().toFixed(2)}
                </div>
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={handleReset}
              disabled={isResetDisabled}
              className={`w-full font-bold py-4 rounded-lg mt-10 transition-all duration-200 uppercase tracking-[0.1em] text-lg ${isResetDisabled
                ? 'bg-very-dark-cyan text-grayish-cyan cursor-not-allowed opacity-50'
                : 'bg-strong-cyan text-very-dark-cyan hover:bg-strong-cyan/80'
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