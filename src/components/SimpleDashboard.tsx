
import React from 'react';
import { MapPin, Sprout, Package, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const SimpleDashboard = () => {
  const statsCards = [
    {
      title: 'Parcelles',
      value: '12',
      subtitle: 'Total des parcelles',
      icon: MapPin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Cultures',
      value: '8',
      subtitle: 'Types de cultures',
      icon: Sprout,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Stock',
      value: '85%',
      subtitle: 'Niveau d\'inventaire',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    {
      title: 'Rendement',
      value: '+12%',
      subtitle: 'vs mois dernier',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsCards.map((stat, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SimpleDashboard;
