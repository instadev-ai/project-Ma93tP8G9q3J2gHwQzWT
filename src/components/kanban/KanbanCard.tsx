import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { KanbanCard as KanbanCardType } from '@/types/kanban';
import { useKanban } from '@/context/KanbanContext';
import { Pencil, Trash2, Calendar } from 'lucide-react';

interface KanbanCardProps {
  card: KanbanCardType;
  index: number;
  columnId: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({ card, index, columnId }) => {
  const { updateCard, deleteCard } = useKanban();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(card.content);
  const [editedDescription, setEditedDescription] = useState(card.description || '');
  const [editedLabels, setEditedLabels] = useState(card.labels?.join(', ') || '');

  const handleSave = () => {
    const labels = editedLabels
      ? editedLabels.split(',').map(label => label.trim()).filter(Boolean)
      : undefined;

    updateCard(card.id, columnId, {
      content: editedContent,
      description: editedDescription || undefined,
      labels
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteCard(card.id, columnId);
    setIsEditing(false);
  };

  return (
    <>
      <Draggable draggableId={card.id} index={index}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="mb-2"
          >
            <Card 
              className={`shadow-sm hover:shadow-md transition-all duration-200 ${
                snapshot.isDragging ? 'shadow-lg ring-2 ring-primary/20' : ''
              }`}
            >
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-sm">{card.content}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={() => setIsEditing(true)}
                  >
                    <Pencil className="h-3 w-3" />
                  </Button>
                </div>
                
                {card.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {card.description}
                  </p>
                )}
                
                {card.dueDate && (
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{card.dueDate}</span>
                  </div>
                )}
                
                {card.labels && card.labels.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {card.labels.map((label, i) => (
                      <Badge 
                        key={i} 
                        variant="secondary" 
                        className="text-xs px-1.5 py-0 h-5 bg-primary/10 text-primary"
                      >
                        {label}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </Draggable>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                placeholder="Card title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                placeholder="Add a more detailed description..."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Labels (comma separated)</label>
              <Input
                value={editedLabels}
                onChange={(e) => setEditedLabels(e.target.value)}
                placeholder="design, feature, bug"
              />
            </div>
          </div>
          <DialogFooter className="flex justify-between">
            <Button variant="destructive" onClick={handleDelete} size="sm">
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)} size="sm">
                Cancel
              </Button>
              <Button onClick={handleSave} size="sm">
                Save Changes
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default KanbanCard;