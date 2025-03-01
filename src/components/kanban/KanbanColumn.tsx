import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { KanbanColumn as KanbanColumnType } from '@/types/kanban';
import { useKanban } from '@/context/KanbanContext';
import KanbanCard from './KanbanCard';
import { Plus, MoreVertical, Pencil, Trash2 } from 'lucide-react';

interface KanbanColumnProps {
  column: KanbanColumnType;
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  const { addCard, updateColumnTitle, deleteColumn } = useKanban();
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCardContent, setNewCardContent] = useState('');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(column.title);

  const handleAddCard = () => {
    if (newCardContent.trim()) {
      addCard(column.id, newCardContent);
      setNewCardContent('');
      setIsAddingCard(false);
    }
  };

  const handleUpdateTitle = () => {
    if (editedTitle.trim()) {
      updateColumnTitle(column.id, editedTitle);
      setIsEditingTitle(false);
    }
  };

  return (
    <Card className="w-[280px] flex flex-col max-h-[calc(100vh-120px)] shadow-sm">
      <CardHeader className="p-3 pb-0">
        <div className="flex justify-between items-center">
          {isEditingTitle ? (
            <div className="flex w-full gap-1">
              <Input
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="h-7 text-sm"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUpdateTitle();
                  if (e.key === 'Escape') setIsEditingTitle(false);
                }}
              />
              <Button size="sm" className="h-7 px-2" onClick={handleUpdateTitle}>
                Save
              </Button>
            </div>
          ) : (
            <>
              <h3 className="font-medium text-sm">{column.title}</h3>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditingTitle(true)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Title
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-destructive focus:text-destructive" 
                    onClick={() => deleteColumn(column.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Column
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto p-2 custom-scrollbar">
        <Droppable droppableId={column.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="min-h-[10px]"
            >
              {column.cards.map((card, index) => (
                <KanbanCard 
                  key={card.id} 
                  card={card} 
                  index={index} 
                  columnId={column.id} 
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </CardContent>
      
      <CardFooter className="p-2 pt-0">
        {isAddingCard ? (
          <div className="w-full space-y-2">
            <Input
              value={newCardContent}
              onChange={(e) => setNewCardContent(e.target.value)}
              placeholder="Enter card title..."
              className="text-sm"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddCard();
                if (e.key === 'Escape') {
                  setIsAddingCard(false);
                  setNewCardContent('');
                }
              }}
            />
            <div className="flex gap-1">
              <Button size="sm" onClick={handleAddCard} className="w-full">
                Add Card
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => {
                  setIsAddingCard(false);
                  setNewCardContent('');
                }}
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            variant="ghost" 
            className="w-full justify-start text-muted-foreground" 
            onClick={() => setIsAddingCard(true)}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add a card
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default KanbanColumn;