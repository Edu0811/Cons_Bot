
import React from 'react';
import { Input } from '../ui/input';
import { DatePickerWithRange } from '../ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { motion } from 'framer-motion';

interface InventoryFiltersProps {
  activeTab: string;
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dateRange?: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
}

const InventoryFilters = ({
  activeTab,
  searchTerm,
  onSearchChange,
  dateRange,
  onDateRangeChange
}: InventoryFiltersProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col md:flex-row gap-3 w-full"
    >
      <div className="relative flex-grow">
        <Input 
          placeholder={`Rechercher dans ${activeTab === 'inventory' ? 'l\'inventaire' : activeTab === 'harvest' ? 'les récoltes' : 'les alertes'}`} 
          value={searchTerm}
          onChange={onSearchChange}
          className="pl-8"
        />
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <div className="w-full md:w-[300px]">
        <DatePickerWithRange
          date={dateRange}
          setDate={onDateRangeChange}
          placeholderText="Filtrer par date"
          align="end"
        />
      </div>
    </motion.div>
  );
};

export default InventoryFilters;
