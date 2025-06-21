
import React from 'react';
import ChartSelector from './statistics/ChartSelector';
import ChartFilters from './statistics/ChartFilters';
import YieldsCharts from './statistics/YieldsCharts';
import FinancialCharts from './statistics/FinancialCharts';
import EnvironmentalCharts from './statistics/EnvironmentalCharts';
import StatisticsLayout from './statistics/StatisticsLayout';
import { useStatistics } from '../contexts/StatisticsContext';
import { useIsMobile } from '@/hooks/use-mobile';
import PreviewPrintButton from './common/PreviewPrintButton';

const Statistics = () => {
  const { 
    period, 
    setPeriod, 
    cropFilter, 
    setCropFilter,
    updateDataWithFilters,
    yieldData,
    financialData,
    environmentalData
  } = useStatistics();
  
  const isMobile = useIsMobile();
  const [currentChart, setCurrentChart] = React.useState<'yields' | 'financial' | 'environmental'>('yields');
  
  const getChartTitle = () => {
    switch (currentChart) {
      case 'yields': return 'Évolution des rendements';
      case 'financial': return 'Analyse financière';
      case 'environmental': return 'Indicateurs environnementaux';
      default: return 'Statistiques';
    }
  };
  
  const getChartDescription = () => {
    switch (currentChart) {
      case 'yields': return 'Évolution des rendements par culture au fil des années';
      case 'financial': return 'Analyse détaillée des performances financières';
      case 'environmental': return 'Suivi des indicateurs de performance environnementale';
      default: return 'Données statistiques de votre exploitation';
    }
  };

  const handleFilterChange = (newPeriod: any, newCropFilter: string) => {
    setPeriod(newPeriod);
    setCropFilter(newCropFilter);
    updateDataWithFilters(newPeriod, newCropFilter);
  };
  
  const getCurrentChartData = () => {
    switch (currentChart) {
      case 'yields':
        return yieldData;
      case 'financial':
        return financialData.profitabilityByParcel;
      case 'environmental':
        return environmentalData.indicators;
      default:
        return [];
    }
  };
  
  const getChartColumns = () => {
    switch (currentChart) {
      case 'yields':
        return [
          { key: "name", header: "Culture" },
          { key: "current", header: "Rendement actuel" },
          { key: "previous", header: "Rendement précédent" },
          { key: "unit", header: "Unité" }
        ];
      case 'financial':
        return [
          { key: "name", header: "Parcelle" },
          { key: "profitability", header: "Rentabilité (€)" },
          { key: "size", header: "Surface (ha)" },
          { key: "crop", header: "Culture" }
        ];
      case 'environmental':
        return [
          { key: "indicator", header: "Indicateur" },
          { key: "current", header: "Valeur actuelle" },
          { key: "target", header: "Objectif" },
          { key: "trend", header: "Tendance" },
          { key: "status", header: "Statut" }
        ];
      default:
        return [];
    }
  };
  
  const handleExportData = async () => {
    console.log(`Exportation des données ${currentChart} en cours...`);
  };
  
  return (
    <StatisticsLayout 
      title={getChartTitle()} 
      description={getChartDescription()}
    >
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <ChartSelector 
          currentChart={currentChart} 
          setCurrentChart={setCurrentChart} 
        />
        
        <div className="flex items-center gap-2">
          <ChartFilters 
            period={period}
            setPeriod={(newPeriod) => handleFilterChange(newPeriod, cropFilter)}
            cropFilter={cropFilter}
            setCropFilter={(newCropFilter) => handleFilterChange(period, newCropFilter)}
            onExport={handleExportData}
          />
          
          <PreviewPrintButton
            data={getCurrentChartData()}
            moduleName={`statistics-${currentChart}`}
            title={getChartTitle()}
            columns={getChartColumns()}
            className="bg-white border-gray-200 hover:bg-gray-50 text-xs md:text-sm h-auto py-1.5 md:py-2 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600"
            variant="outline"
          />
        </div>
      </div>

      <div className={`min-w-full ${isMobile ? 'min-w-[500px]' : ''}`}>
        {currentChart === 'yields' && <YieldsCharts />}
        {currentChart === 'financial' && <FinancialCharts />}
        {currentChart === 'environmental' && <EnvironmentalCharts />}
      </div>
    </StatisticsLayout>
  );
};

export default Statistics;
