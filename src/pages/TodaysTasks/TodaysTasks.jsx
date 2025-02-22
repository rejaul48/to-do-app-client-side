
import React, { useState, useContext } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ToDoContext } from '../../authContext/ContextApi';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Modal from '../../components/Modal/Modal';
import TasksCard from '../../components/TasksCard/TasksCard';
import Swal from 'sweetalert2';

const TodaysTasks = () => {
    const axiosPublic = useAxiosPublic();
    const { currentUser, user, theme } = useContext(ToDoContext);
    const [selectedTask, setSelectedTask] = useState(null);
    const queryClient = useQueryClient();

    // Fetch tasks using React Query
    const { data: tasks = { todo: [], inProgress: [], done: [] }, isLoading } = useQuery({
        queryKey: ['tasks', user?.email || currentUser?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/tasks/email/${user?.email || currentUser?.email}`);
            const fetchedTasks = Array.isArray(res.data) ? res.data : [];
            return {
                todo: fetchedTasks.filter(task => task.category === "todo"),
                inProgress: fetchedTasks.filter(task => task.category === "inProgress"),
                done: fetchedTasks.filter(task => task.category === "done"),
            };
        },
    });

    // Mutation for updating task position
    const updateTaskPosition = useMutation({
        mutationFn: async ({ taskId, category, position }) => {
            await axiosPublic.put(`/tasks/updatePosition/${taskId}`, { category, position });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['tasks', user?.email || currentUser?.email]);
        },
    });

    // Handle task movement
    const moveTask = (taskId, fromCategory, toCategory, fromIndex, toIndex) => {
        const updatedTasks = { ...tasks };

        // Find the task being moved
        const taskToMove = updatedTasks[fromCategory].find(task => task._id === taskId);

        if (!taskToMove) return; // Task not found

        // Remove the task from the source category
        updatedTasks[fromCategory] = updatedTasks[fromCategory].filter(task => task._id !== taskId);

        // Add the task to the destination category at the correct position
        updatedTasks[toCategory].splice(toIndex, 0, taskToMove);

        // Update React Query cache
        queryClient.setQueryData(['tasks', user?.email || currentUser?.email], updatedTasks);

        // Update task category and position in the backend
        updateTaskPosition.mutate({
            taskId: taskId,
            category: toCategory,
            position: toIndex,
        });
    };

    // Delete task handler
    // const handleTaskDelete = (id) => {
    //     axiosPublic.delete(`/tasks/${id}`)
    //         .then(() => {
    //             alert("Task Deleted successfully");
    //             queryClient.invalidateQueries(['tasks', user?.email || currentUser?.email]);
    //         })
    //         .catch(err => console.log(err));
    // };


    const handleTaskDelete = (id) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosPublic.delete(`/tasks/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your task has been deleted.",
                            icon: "success"
                        });
                        queryClient.invalidateQueries(['tasks', user?.email || currentUser?.email]);
                    })
                    .catch(err => console.log(err));


            }
        });


    };



    // Draggable Task Component

    const DraggableTask = ({ task, category, index }) => {
        const ref = React.useRef(null);

        const [{ isDragging }, drag] = useDrag({
            type: 'TASK',
            item: { task, category, index },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        });

        const [, drop] = useDrop({
            accept: 'TASK',
            hover: (item, monitor) => {
                if (item.task._id !== task._id) {
                    const dragIndex = item.index;
                    const hoverIndex = index;

                    // Don't replace items with themselves
                    if (dragIndex === hoverIndex) return;

                    // Determine rectangle on screen
                    const hoverBoundingRect = ref.current?.getBoundingClientRect();
                    if (!hoverBoundingRect) return;

                    // Get vertical middle
                    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

                    // Determine mouse position
                    const clientOffset = monitor.getClientOffset();
                    if (!clientOffset) return;

                    // Get pixels to the top
                    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

                    // Only perform the move when the mouse has crossed half of the item's height
                    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
                    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

                    // Move the task
                    moveTask(item.task._id, item.category, category, dragIndex, hoverIndex);

                    // Update the index for the dragged item
                    item.index = hoverIndex;
                }
            },
        });

        drag(drop(ref));

        return (
            <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }}>
                <TasksCard
                    task={task}
                    category={category}
                    handleTaskDelete={handleTaskDelete}
                    openModal={() => setSelectedTask(task)}
                />
            </div>
        );
    };
    // Droppable Category Component
    const DroppableCategory = ({ category, tasks }) => {
        const [, drop] = useDrop({
            accept: 'TASK',
            drop: (item) => {
                if (item.category !== category) {
                    moveTask(item.task._id, item.category, category, item.index, tasks.length);
                }
            },
        });

        return (
            <div ref={drop} className='border-[1px] border-[#66785F] p-2 rounded-sm h-[350px] md:h-[40vh] lg:h-[70vh]'>
                <h2 className={`text-xl md:text-2xl font-semibold pb-2 ${theme === 'dark' ? "text-white" : 'text-black'}`}>{category}:</h2>
                <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)]'>
                    {tasks.map((task, index) => (
                        <DraggableTask key={task._id} task={task} category={category} index={index} />
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <main className='w-full'>
            <section className='py-5'>
                <div className={`flex items-center justify-between p-4 text-[#FBFBFB] ${theme === 'dark' ? "text-white" : 'bg-[#91AC8F] text-black'}`}>
                    <h2 className='text-xl md:text-2xl font-semibold uppercase'>Add your task {currentUser?.name}</h2>
                </div>

                <section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mt-5'>
                    {['todo', 'inProgress', 'done'].map(category => (
                        <DroppableCategory key={category} category={category} tasks={tasks[category]} />
                    ))}
                </section>

                <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)}>
                    <div >
                        <h2 className="text-lg font-bold">{selectedTask?.title}</h2>
                        <p>{selectedTask?.description}</p>
                    </div>
                </Modal>
            </section>
        </main>
    );
};

export default TodaysTasks;