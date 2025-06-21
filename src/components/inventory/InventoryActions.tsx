
import React, { useRef } from 'react';
import { Button } from '../ui/button';
import { Download, Plus, Upload, FileUp, FileDown, BarChart2, Package } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { downloadInventoryTemplate } from './ImportExportFunctions';

interface InventoryActionsProps {
  activeTab: string;
  onExportData: () => void;
  onAddItem: () => void;
}

const InventoryActions = ({ activeTab, onExportData, onAddItem }: InventoryActionsProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log(`Importation du fichier ${file.name}`);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDownloadTemplate = () => {
    downloadInventoryTemplate();
    console.log("Téléchargement du modèle d'inventaire");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="whitespace-nowrap transition-colors hover:bg-gray-100">
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border shadow-lg">
          <DropdownMenuItem onClick={onExportData} className="cursor-pointer">
            <FileDown className="mr-2 h-4 w-4" />
            Exporter CSV
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportData} className="cursor-pointer">
            <BarChart2 className="mr-2 h-4 w-4" />
            Exporter PDF
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="whitespace-nowrap transition-colors hover:bg-gray-100">
            <Upload className="mr-2 h-4 w-4" />
            Importer
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white border shadow-lg">
          <DropdownMenuItem onClick={handleImportClick} className="cursor-pointer">
            <FileUp className="mr-2 h-4 w-4" />
            Importer un fichier
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleDownloadTemplate} className="cursor-pointer">
            <Package className="mr-2 h-4 w-4" />
            Télécharger modèle
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".csv"
        className="hidden" 
      />
      
      <Button 
        onClick={onAddItem} 
        className="whitespace-nowrap transition-colors hover:bg-green-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        {activeTab === 'inventory' ? 'Ajouter un stock' : 
         activeTab === 'harvest' ? 'Ajouter une récolte' : 
         activeTab === 'weather' ? 'Ajouter une alerte' : 'Ajouter'}
      </Button>
    </div>
  );
};

export default InventoryActions;
