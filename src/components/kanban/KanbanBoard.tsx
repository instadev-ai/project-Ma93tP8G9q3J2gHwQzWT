import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useKanban } from '@/context/KanbanContext';
import KanbanColumn from './KanbanColumn';
import { Plus, X } from 'lucide-react';

const KanbanBoard: React.FC = () => {
  const { board, handleDragEnd, addColumn } = useKanban();
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState('');

  const handleAddColumn = () => {
    if (newColumnTitle.trim()) {
      addColumn(newColumnTitle);
      setNewColumnTitle('');
      setIsAddingColumn(false);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex items-start gap-4 p-4 overflow-x-auto min-h-[calc(100vh-80px)] pb-10">
        {board.columns.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
        
        {isAddingColumn ? (
          <div className="w-[280px] bg-card rounded-md shadow-sm p-2 border">
            <Input
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              placeholder="Enter column title..."
              className="mb-2"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddColumn();
                if (e.key === 'Escape') {
                  setIsAddingColumn(false);
                  setNewColumnTitle('');
                }
              }}
            />
            <div className="flex gap-1">
              <Button onClick={handleAddColumn} size="sm">
                Add Column
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => {
                  setIsAddingColumn(false);
                  setNewColumnTitle('');
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="min-w-[280px] border-dashed flex items-center gap-1 bg-background/50 hover:bg-background"
            onClick={() => setIsAddingColumn(true)}
          >
            <Plus className="h-4 w-4" />
            Add Column
          </Button>
        )}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;