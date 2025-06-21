
import React, { createContext, useContext, useState, useEffect } from 'react';

// Types pour les différentes données statistiques
export interface YieldData {
  name: string;
  current: number;
  previous: number;
  unit: string;
}

export interface FinancialData {
  name: string;
  profitability: number;
  size: number;
  crop: string;
}

export interface EnvironmentalData {
  indicator: string;
  current: number;
  target: number;
  trend: string;
  status: 'Atteint' | 'En progrès' | 'En retard';
}

interface StatisticsContextType {
  yieldData: YieldData[];
  setYieldData: React.Dispatch<React.SetStateAction<YieldData[]>>;
  
  financialData: {
    profitabilityByParcel: FinancialData[];
    costAnalysis: any[];
    revenueByMonth: any[];
  };
  setFinancialData: React.Dispatch<React.SetStateAction<{
    profitabilityByParcel: FinancialData[];
    costAnalysis: any[];
    revenueByMonth: any[];
  }>>;
  
  environmentalData: {
    indicators: EnvironmentalData[];
    carbonFootprint: number;
    waterUsage: number;
    biodiversity: number;
  };
  setEnvironmentalData: React.Dispatch<React.SetStateAction<{
    indicators: EnvironmentalData[];
    carbonFootprint: number;
    waterUsage: number;
    biodiversity: number;
  }>>;
  
  period: 'day' | 'week' | 'month' | 'year';
  setPeriod: React.Dispatch<React.SetStateAction<'day' | 'week' | 'month' | 'year'>>;
  cropFilter: string;
  setCropFilter: React.Dispatch<React.SetStateAction<string>>;
  
  updateDataWithFilters: (period: string, crop: string) => void;
}

const StatisticsContext = createContext<StatisticsContextType | undefined>(undefined);

export const useStatistics = () => {
  const context = useContext(StatisticsContext);
  if (context === undefined) {
    throw new Error('useStatistics must be used within a StatisticsProvider');
  }
  return context;
};

// Données simplifiées
const initialYieldData: YieldData[] = [
  { name: 'Canne à Sucre', current: 85, previous: 75, unit: 't/ha' },
  { name: 'Banane', current: 32, previous: 30, unit: 't/ha' },
  { name: 'Ananas', current: 45, previous: 48, unit: 't/ha' },
  { name: 'Igname', current: 18, previous: 15, unit: 't/ha' },
  { name: 'Madère', current: 22, previous: 20, unit: 't/ha' }
];

const initialProfitabilityData: FinancialData[] = [
  { name: 'Parcelle Nord', profitability: 1250, size: 12.5, crop: 'Canne à Sucre' },
  { name: 'Parcelle Est', profitability: 980, size: 8.3, crop: 'Banane' },
  { name: 'Parcelle Sud', profitability: 1580, size: 15.7, crop: 'Ananas' },
  { name: 'Parcelle Ouest', profitability: 850, size: 10.2, crop: 'Igname' },
  { name: 'Parcelle Centrale', profitability: 920, size: 6.8, crop: 'Madère' }
];

const initialEnvironmentalIndicators: EnvironmentalData[] = [
  { indicator: 'Émissions CO2 (t/ha)', current: 2.8, target: 2.5, trend: '-5%', status: 'En progrès' },
  { indicator: 'Consommation d\'eau (m³/ha)', current: 350, target: 320, trend: '-8%', status: 'Atteint' },
  { indicator: 'Utilisation d\'intrants (kg/ha)', current: 180, target: 150, trend: '-12%', status: 'En progrès' },
  { indicator: 'Surface en agriculture bio (%)', current: 15, target: 25, trend: '+5%', status: 'En progrès' },
  { indicator: 'Biodiversité (espèces/ha)', current: 12, target: 15, trend: '+12%', status: 'Atteint' }
];

export const StatisticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [yieldData, setYieldData] = useState<YieldData[]>(initialYieldData);
  const [financialData, setFinancialData] = useState({
    profitabilityByParcel: initialProfitabilityData,
    costAnalysis: [],
    revenueByMonth: []
  });
  const [environmentalData, setEnvironmentalData] = useState({
    indicators: initialEnvironmentalIndicators,
    carbonFootprint: -15,
    waterUsage: -8,
    biodiversity: 12
  });
  const [period, setPeriod] = useState<'day' | 'week' | 'month' | 'year'>('year');
  const [cropFilter, setCropFilter] = useState('all');
  
  const updateDataWithFilters = (period: string, crop: string) => {
    if (crop !== 'all') {
      const filteredYieldData = initialYieldData.filter(item => item.name === crop);
      setYieldData(filteredYieldData);
      
      const filteredProfitabilityData = initialProfitabilityData.filter(item => item.crop === crop);
      setFinancialData(prev => ({
        ...prev,
        profitabilityByParcel: filteredProfitabilityData
      }));
    } else {
      setYieldData(initialYieldData);
      setFinancialData(prev => ({
        ...prev,
        profitabilityByParcel: initialProfitabilityData
      }));
    }
  };
  
  useEffect(() => {
    updateDataWithFilters(period, cropFilter);
  }, [period, cropFilter]);
  
  return (
    <StatisticsContext.Provider 
      value={{ 
        yieldData, 
        setYieldData,
        financialData,
        setFinancialData,
        environmentalData,
        setEnvironmentalData,
        period,
        setPeriod,
        cropFilter,
        setCropFilter,
        updateDataWithFilters
      }}
    >
      {children}
    </StatisticsContext.Provider>
  );
};
