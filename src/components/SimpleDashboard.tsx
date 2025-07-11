
import React from 'react';
import { MapPin, Sprout, Package, TrendingUp, NotebookPen, Atom, LibraryBig, BookOpen, BookA, Bot} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

const SimpleDashboard = () => {
  const statsCards = [

    {
      title: 'Cons.BOT',
      // value: '8',
      subtitle: 'Cons BOT',
      icon: Bot,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      onClick: () => window.open('https://consbot.onrender.com', '_blank'),
      tooltip: 'Open ConsBOT in a new tab'
    },


    {
      title: 'Cons.GPT',
      // value: '12',
      subtitle: 'OpenAI ChatGPT',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      onClick: () => window.open('https://chatgpt.com/g/g-9rjMAqtTg-consgpt', '_blank'),
      tooltip: 'Open ConsGPT in a new tab'
    },
    {
      title: 'Cons.LM',
      // value: '8',
      subtitle: 'Google NotebookLM',
      icon: NotebookPen,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      onClick: () => window.open('https://notebooklm.google.com/notebook/c3528e65-0c2b-4a80-b3f2-2f22e3626b67?_gl=1*1plgwls*_ga*MTk3OTE1MzMxNC4xNzIzMTU4NzQz*_ga_W0LDH41ZCB*MTczMjM2NDM3Ni4yMy4xLjE3MzIzNjQzOTcuMzkuMC4w', '_blank'),
      tooltip: 'Open ConsNotebookLM in a new tab'
    },

    {
      title: 'Cons.ALL',
      // value: '8',
      subtitle: 'Google NotebookLM',
      icon: Atom,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      onClick: () => window.open('https://notebooklm.google.com/notebook/14ae1218-192e-4495-8d94-1b071082fe57?_gl=1*1plgwls*_ga*MTk3OTE1MzMxNC4xNzIzMTU4NzQz*_ga_W0LDH41ZCB*MTczMjM2NDM3Ni4yMy4xLjE3MzIzNjQzOTcuMzkuMC4w', '_blank'),
      tooltip: 'Open ConsNotebookLM in a new tab'
    },

    {
      title: 'Lexical Search',
      // value: '8',
      subtitle: 'Google NotebookLM',
      icon: LibraryBig,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      onClick: () => window.open('https://lexicalsearch.onrender.com', '_blank'),
      tooltip: 'Open Lexical Search in a new tab'
    },

    {
      title: 'Semantic Search',
      // value: '8',
      subtitle: 'Google NotebookLM',
      icon: BookA,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      onClick: () => window.open('https://semanticsearch.onrender.com', '_blank'),
      tooltip: 'Open Semantic Search in a new tab'
    }
  ];

  return (
    <TooltipProvider>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          stat.tooltip ? (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Card 
                  className={`hover:shadow-lg transition-shadow ${stat.onClick ? 'cursor-pointer' : ''}`}
                  onClick={stat.onClick}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-base font-bold text-black">{stat.title}</p>
                        {/* Value is commented out in the data objects */}
                        <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                      </div>
                      <div className={`p-3 rounded-full ${stat.bgColor}`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TooltipTrigger>
              <TooltipContent>
                <p>{stat.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <Card   
              key={index}
              className="hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-base font-bold text-black">{stat.title}</p>
                    {/* Value is commented out in the data objects */}
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SimpleDashboard;
