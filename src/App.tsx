import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const App: React.FC = () => {
  const current = 371.4; // constant current value
  const [maxSupply, setMaxSupply] = useState(500);
  const [firstYearMint, setFirstYearMint] = useState(30);
  const [error, setError] = useState<string | null>(null);

  const handleMaxSupplyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value <= current) {
      setError('Max Supply must be greater than the current value of 371.4.');
    } else if (current + firstYearMint > value) {
      setError('Max Supply must be greater than current + First Year Mint. Please input a larger Max Supply or smaller First Year Mint.');
    } else {
      setError(null);
    }
    setMaxSupply(value);
  };

  const handleFirstYearMintChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (current + value > maxSupply) {
      setError('First Year Mint + current exceeds Max Supply. Please increase Max Supply.');
    } else {
      setError(null);
    }
    setFirstYearMint(value);
  };

  const mintCalculator = () => {
    if (maxSupply <= current || current + firstYearMint > maxSupply) return [];

    const lambda = 1 - firstYearMint / (maxSupply - current); // Calculate lambda
    const mints = Array.from({ length: 10 }, (_, k) => firstYearMint * Math.pow(lambda, k)); // Calculate mints for 10 years
    return mints;
  };

  const calculateAPR = (mints: number[]) => {
    const apr = [];
    let cumulativeMint = 0;

    for (let k = 0; k < mints.length; k++) {
      cumulativeMint += k === 0 ? 0 : mints[k - 1];
      const aprValue = 0.9*(1/0.62)*(mints[k] / (current + cumulativeMint)) * 100;
      apr.push(aprValue);
    }

    return apr;
  };

  const mintData = mintCalculator();
  const aprData = calculateAPR(mintData);

  const mintPlotData = {
    labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
    datasets: [
      {
        label: 'AZERO Minted Per Year (M)',
        data: mintData,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const aprPlotData = {
    labels: Array.from({ length: 10 }, (_, i) => `Year ${i + 1}`),
    datasets: [
      {
        label: 'Staking APR (%) assuming 62% of all AZERO staked',
        data: aprData,
        fill: false,
        borderColor: 'rgb(192, 75, 75)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Allows us to control width and height
    responsive: true,
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>AIP02 Inflation Calculator</h1>
      <div>
        <label>
          Max Supply (M):
          <input
            type="range"
            min={Math.ceil(current) + 1}
            max="1000"
            value={maxSupply}
            onChange={handleMaxSupplyChange}
          />
          {maxSupply}
        </label>
      </div>
      <div>
        <label>
          First Year AZERO minted (M):
          <input
            type="range"
            min="1"
            max="60"
            value={firstYearMint}
            onChange={handleFirstYearMintChange}
          />
          {firstYearMint}
        </label>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error messages */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        {/* First Plot */}
        <div style={{ width: '45%', height: '300px' }}> {/* Adjusted size */}
          <Line data={mintPlotData} options={options} />
        </div>
        {/* Second Plot */}
        <div style={{ width: '45%', height: '300px' }}> {/* Adjusted size */}
          <Line data={aprPlotData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default App;
