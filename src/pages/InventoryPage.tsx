
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import TabContainer, { TabItem } from '../components/layout/TabContainer';
import Inventory from '../components/Inventory';
import GuadeloupeHarvestTracking from '../components/GuadeloupeHarvestTracking';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import InventoryHeader from '../components/inventory/InventoryHeader';
import InventoryActions from '../components/inventory/InventoryActions';
import InventoryFilters from '../components/inventory/InventoryFilters';
import { DateRange } from 'react-day-picker';
import usePageMetadata from '../hooks/use-page-metadata';
import { StatisticsProvider } from '../contexts/StatisticsContext';

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState<string>('inventory');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { 
    title, 
    description, 
    handleTitleChange, 
    handleDescriptionChange 
  } = usePageMetadata({
    defaultTitle: 'Gestion des Stocks et Récoltes',
    defaultDescription: 'Gérez votre inventaire et suivez les niveaux de stock de vos cultures guadeloupéennes'
  });

  const handleExportData = () => {
    if (activeTab === 'inventory') {
      console.log("Export des données d'inventaire lancé");
    } else if (activeTab === 'harvest') {
      console.log("Export des données de récoltes");
    } else if (activeTab === 'weather') {
      console.log("Export des données météo");
    }
  };

  const handleAddItem = () => {
    const actionText = activeTab === 'inventory' ? 'stock' : 
                      activeTab === 'harvest' ? 'récolte' : 
                      activeTab === 'weather' ? 'alerte' : 'élément';
                      
    console.log(`Fonctionnalité d'ajout de ${actionText} activée`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const harvestContent = (
    <StatisticsProvider>
      <div className="space-y-8">
        <GuadeloupeHarvestTracking />
      </div>
    </StatisticsProvider>
  );

  const tabs: TabItem[] = [
    {
      value: 'inventory',
      label: 'Inventaire',
      content: <Inventory dateRange={dateRange} searchTerm={searchTerm} />
    },
    {
      value: 'harvest',
      label: 'Récoltes',
      content: harvestContent
    },
    {
      value: 'weather',
      label: 'Météo',
      content: <GuadeloupeWeatherAlerts />
    }
  ];

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    const tabLabels = {
      inventory: 'l\'Inventaire',
      harvest: 'les Récoltes',
      weather: 'les Alertes Météo'
    };
    
    console.log(`Vous consultez maintenant ${tabLabels[value as keyof typeof tabLabels] || value}`);
  };

  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <InventoryHeader
          title={title}
          description={description}
          onTitleChange={handleTitleChange}
          onDescriptionChange={handleDescriptionChange}
          actions={
            <InventoryActions
              activeTab={activeTab}
              onExportData={handleExportData}
              onAddItem={handleAddItem}
            />
          }
          filterArea={
            <InventoryFilters
              activeTab={activeTab}
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              dateRange={dateRange}
              onDateRangeChange={setDateRange}
            />
          }
        />

        <TabContainer 
          tabs={tabs} 
          defaultValue={activeTab} 
          onValueChange={handleTabChange} 
        />
      </div>
    </PageLayout>
  );
};

export default InventoryPage;
