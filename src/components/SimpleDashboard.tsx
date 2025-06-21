
import React, { useState } from 'react';
import { MapPin, Sprout, Package, TrendingUp, Users, Calendar, Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';

interface Task {
  id: number;
  title: string;
  date: string;
  status: 'pending' | 'completed';
}

interface Alert {
  id: number;
  message: string;
  type: 'warning' | 'info' | 'danger';
}

const SimpleDashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Arrosage des tomates', date: '2024-06-21', status: 'pending' },
    { id: 2, title: 'Récolte des bananes', date: '2024-06-22', status: 'completed' },
    { id: 3, title: 'Traitement phytosanitaire', date: '2024-06-23', status: 'pending' },
  ]);

  const [alerts, setAlerts] = useState<Alert[]>([
    { id: 1, message: 'Vérifier le système d\'irrigation', type: 'warning' },
    { id: 2, message: 'Nouvelle variété de banane disponible', type: 'info' },
    { id: 3, message: 'Alerte sécheresse prévue', type: 'danger' },
  ]);

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

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast.success('Tâche supprimée');
  };

  const toggleTaskStatus = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id 
        ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
        : task
    ));
    toast.success('Statut de la tâche mis à jour');
  };

  const deleteAlert = (id: number) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
    toast.success('Alerte supprimée');
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'danger': return 'bg-red-100 border-l-4 border-red-500 text-red-700';
      case 'warning': return 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700';
      case 'info': return 'bg-blue-100 border-l-4 border-blue-500 text-blue-700';
      default: return 'bg-gray-100 border-l-4 border-gray-500 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Tâches du jour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div 
                  key={task.id} 
                  className={`p-3 rounded-lg border ${
                    task.status === 'completed' 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-gray-50 border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={task.status === 'completed'}
                        onChange={() => toggleTaskStatus(task.id)}
                        className="h-4 w-4 text-agri-primary"
                      />
                      <div>
                        <p className={`font-medium ${
                          task.status === 'completed' ? 'line-through text-gray-500' : ''
                        }`}>
                          {task.title}
                        </p>
                        <p className="text-sm text-muted-foreground">{task.date}</p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteTask(task.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une tâche
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Alertes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-3 rounded-lg ${getAlertColor(alert.type)}`}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => deleteAlert(alert.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button size="sm" variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une alerte
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleDashboard;
