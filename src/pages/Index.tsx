
import React, { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';
import SimpleDashboard from '../components/SimpleDashboard';
import GuadeloupeWeatherAlerts from '../components/GuadeloupeWeatherAlerts';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const Index = () => {
  const [userName] = useState('Exploitant');
  const [activeView, setActiveView] = useState<'dashboard' | 'weather'>('dashboard');
  
  return (
    <PageLayout>
      <div className="p-6 animate-enter">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Tableau de Bord Agri Dom</h1>
            <p className="text-gray-500">
              Bienvenue, {userName}
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant={activeView === 'dashboard' ? 'default' : 'outline'}
              onClick={() => setActiveView('dashboard')}
            >
              Tableau de Bord
            </Button>
            <Button 
              variant={activeView === 'weather' ? 'default' : 'outline'}
              onClick={() => setActiveView('weather')}
            >
              Alertes Météo
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Actualiser
            </Button>
          </div>
        </div>
        
        {activeView === 'dashboard' && <SimpleDashboard />}
        {activeView === 'weather' && <GuadeloupeWeatherAlerts />}
      </div>
    </PageLayout>
  );
};

export default Index;
