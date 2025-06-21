
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, BarChart3 } from 'lucide-react';
import { Button } from '../ui/button';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb';

interface StatisticsLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

const StatisticsLayout = ({ title, description, children }: StatisticsLayoutProps) => {
  return (
    <div className="p-3 md:p-6 animate-enter">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Statistiques</h1>
            <p className="text-gray-600">Analysez les performances de votre exploitation</p>
          </div>
        </div>
      </div>
      
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Tableau de bord</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/statistiques">Statistiques</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{title}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="bg-white rounded-xl border border-gray-100 p-3 md:p-6 mb-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <h2 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h2>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-300 mb-4 md:mb-6">{description}</p>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-2 md:p-4 overflow-x-auto">
          {children}
        </div>
        
        <div className="mt-6 flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour au tableau de bord
            </Link>
          </Button>
          
          <Button variant="outline" size="sm" asChild>
            <Link to="/rapports">
              Voir tous les rapports
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StatisticsLayout;
