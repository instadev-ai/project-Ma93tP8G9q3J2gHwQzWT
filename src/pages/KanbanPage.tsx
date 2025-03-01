import React from 'react';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Plus, Download, Upload, Settings } from 'lucide-react';

const KanbanPage: React.FC = () => {
  const { toast } = useToast();

  const handleExport = () => {
    // In a real app, this would export the board data
    toast({
      title: "Board exported",
      description: "Your board data has been exported successfully.",
    });
  };

  const handleImport = () => {
    // In a real app, this would import board data
    toast({
      title: "Import feature",
      description: "This feature would allow importing board data.",
    });
  };

  const handleSettings = () => {
    toast({
      title: "Settings",
      description: "Board settings would open here.",
    });
  };

  return (
    <div className="kanban-container min-h-screen bg-[#fafafa]">
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold text-gray-800">Kanban Board</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={handleImport}>
              <Upload className="h-4 w-4 mr-1" />
              Import
            </Button>
            <Button variant="outline" size="sm" onClick={handleSettings}>
              <Settings className="h-4 w-4 mr-1" />
              Settings
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto">
        <KanbanBoard />
      </main>
    </div>
  );
};

export default KanbanPage;