
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import routers from './routers/router.jsx';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ToDoProvider from './authContext/ContextApi.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToDoProvider >
        <DndProvider backend={HTML5Backend}>
          <RouterProvider router={routers} />
        </DndProvider>
      </ToDoProvider>
    </QueryClientProvider>
  </StrictMode>
);
