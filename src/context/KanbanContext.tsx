import React, { createContext, useContext, useState, ReactNode } from 'react';
import { KanbanBoard, KanbanColumn, KanbanCard, DragEndResult } from '@/types/kanban';
import { v4 as uuidv4 } from 'uuid';

// Initial data for the Kanban board
const initialData: KanbanBoard = {
  columns: [
    {
      id: 'column-1',
      title: 'To Do',
      cards: [
        {
          id: 'card-1',
          content: 'Create project structure',
          description: 'Set up the initial project structure and dependencies',
          labels: ['setup']
        },
        {
          id: 'card-2',
          content: 'Design UI components',
          description: 'Create reusable UI components for the application',
          labels: ['design', 'ui']
        }
      ]
    },
    {
      id: 'column-2',
      title: 'In Progress',
      cards: [
        {
          id: 'card-3',
          content: 'Implement drag and drop',
          description: 'Add drag and drop functionality to the Kanban board',
          labels: ['feature']
        }
      ]
    },
    {
      id: 'column-3',
      title: 'Done',
      cards: [
        {
          id: 'card-4',
          content: 'Project setup',
          description: 'Initialize the project with Vite and React',
          labels: ['setup']
        }
      ]
    }
  ]
};

interface KanbanContextProps {
  board: KanbanBoard;
  handleDragEnd: (result: DragEndResult) => void;
  addCard: (columnId: string, content: string, description?: string, labels?: string[]) => void;
  addColumn: (title: string) => void;
  updateCard: (cardId: string, columnId: string, updates: Partial<KanbanCard>) => void;
  deleteCard: (cardId: string, columnId: string) => void;
  updateColumnTitle: (columnId: string, title: string) => void;
  deleteColumn: (columnId: string) => void;
}

const KanbanContext = createContext<KanbanContextProps | undefined>(undefined);

export const KanbanProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [board, setBoard] = useState<KanbanBoard>(initialData);

  const handleDragEnd = (result: DragEndResult) => {
    const { destination, source, draggableId } = result;

    // If there's no destination, do nothing
    if (!destination) return;

    // If the source and destination are the same, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Find the source and destination columns
    const sourceColumn = board.columns.find(col => col.id === source.droppableId);
    const destColumn = board.columns.find(col => col.id === destination.droppableId);

    if (!sourceColumn || !destColumn) return;

    // Create a new array of columns
    const newColumns = [...board.columns];

    // If moving within the same column
    if (source.droppableId === destination.droppableId) {
      const column = newColumns.find(col => col.id === source.droppableId);
      if (!column) return;

      // Create a new array of cards
      const newCards = Array.from(column.cards);
      // Remove the card from the source
      const [removed] = newCards.splice(source.index, 1);
      // Insert the card at the destination
      newCards.splice(destination.index, 0, removed);

      // Update the column with the new cards
      column.cards = newCards;
    } else {
      // Moving from one column to another
      const sourceCol = newColumns.find(col => col.id === source.droppableId);
      const destCol = newColumns.find(col => col.id === destination.droppableId);
      
      if (!sourceCol || !destCol) return;

      // Create new arrays of cards
      const sourceCards = Array.from(sourceCol.cards);
      const destCards = Array.from(destCol.cards);

      // Remove the card from the source
      const [removed] = sourceCards.splice(source.index, 1);
      // Insert the card at the destination
      destCards.splice(destination.index, 0, removed);

      // Update the columns with the new cards
      sourceCol.cards = sourceCards;
      destCol.cards = destCards;
    }

    // Update the board with the new columns
    setBoard({ columns: newColumns });
  };

  const addCard = (columnId: string, content: string, description?: string, labels?: string[]) => {
    const newCard: KanbanCard = {
      id: `card-${uuidv4()}`,
      content,
      description,
      labels
    };

    const newColumns = board.columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: [...column.cards, newCard]
        };
      }
      return column;
    });

    setBoard({ columns: newColumns });
  };

  const addColumn = (title: string) => {
    const newColumn: KanbanColumn = {
      id: `column-${uuidv4()}`,
      title,
      cards: []
    };

    setBoard({ columns: [...board.columns, newColumn] });
  };

  const updateCard = (cardId: string, columnId: string, updates: Partial<KanbanCard>) => {
    const newColumns = board.columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: column.cards.map(card => {
            if (card.id === cardId) {
              return { ...card, ...updates };
            }
            return card;
          })
        };
      }
      return column;
    });

    setBoard({ columns: newColumns });
  };

  const deleteCard = (cardId: string, columnId: string) => {
    const newColumns = board.columns.map(column => {
      if (column.id === columnId) {
        return {
          ...column,
          cards: column.cards.filter(card => card.id !== cardId)
        };
      }
      return column;
    });

    setBoard({ columns: newColumns });
  };

  const updateColumnTitle = (columnId: string, title: string) => {
    const newColumns = board.columns.map(column => {
      if (column.id === columnId) {
        return { ...column, title };
      }
      return column;
    });

    setBoard({ columns: newColumns });
  };

  const deleteColumn = (columnId: string) => {
    const newColumns = board.columns.filter(column => column.id !== columnId);
    setBoard({ columns: newColumns });
  };

  return (
    <KanbanContext.Provider
      value={{
        board,
        handleDragEnd,
        addCard,
        addColumn,
        updateCard,
        deleteCard,
        updateColumnTitle,
        deleteColumn
      }}
    >
      {children}
    </KanbanContext.Provider>
  );
};

export const useKanban = () => {
  const context = useContext(KanbanContext);
  if (context === undefined) {
    throw new Error('useKanban must be used within a KanbanProvider');
  }
  return context;
};