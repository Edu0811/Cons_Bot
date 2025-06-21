
import React from 'react';
import { Package } from 'lucide-react';
import PageHeader from '../layout/PageHeader';

interface InventoryHeaderProps {
  title: string;
  description: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  actions: React.ReactNode;
  filterArea: React.ReactNode;
}

const InventoryHeader = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange,
  actions,
  filterArea
}: InventoryHeaderProps) => {
  return (
    <PageHeader 
      title={title}
      description={description}
      onTitleChange={onTitleChange}
      onDescriptionChange={onDescriptionChange}
      actions={actions}
      icon={<Package className="h-6 w-6" />}
      filterArea={filterArea}
    />
  );
};

export default InventoryHeader;
