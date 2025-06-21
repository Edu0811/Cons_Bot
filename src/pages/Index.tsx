
import React from 'react';
import PageLayout from '../components/layout/PageLayout';
import SimpleDashboard from '../components/SimpleDashboard';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const Index = () => {
  return (
    <PageLayout>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Toolbox de IA da Conscienciologia</h1>
            <p className="text-gray-500">Olá conscienciólogo!</p>
            <p className="text-gray-500">Vamos pesquisar o conteúdo da Conscienciologia usando as ferramentas de IA</p>
          </div>
          <div className="flex gap-3">
            <Button variant="default">
              Dashboard
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
          </div>
        </div>
        
        <SimpleDashboard />
      </div>
    </PageLayout>
  );
};

export default Index;
