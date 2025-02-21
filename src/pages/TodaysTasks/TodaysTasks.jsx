

// import React, { useEffect, useState } from 'react';
// import { FaPen } from 'react-icons/fa';
// import { CiTrash } from 'react-icons/ci';
// import { useDrag, useDrop } from 'react-dnd';
// import { Link } from 'react-router-dom';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import TaskTimer from '../../components/TaskTimer/TaskTimer';

// const truncateText = (text = '', wordLimit) => {
//     if (!text) return '';
//     const words = text.split(' ');
//     return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + ' ...' : text;
// };

// const Task = ({ task, index, moveTask, category, handleTaskDelete }) => {
//     const [, drag] = useDrag({
//         type: 'TASK',
//         item: { index, category, task },
//     });

//     const [, drop] = useDrop({
//         accept: 'TASK',
//         hover: (item) => {
//             if (item.index !== index || item.category !== category) {
//                 moveTask(item.index, index, item.category, category);
//                 item.index = index;
//                 item.category = category;
//             }
//         },
//         drop: (item) => {
//             if (item.index !== index || item.category !== category) {
//                 moveTask(item.index, index, item.category, category);
//             }
//         },
//     });

//     return (
//         <li ref={(node) => drag(drop(node))} className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
//             <Link className='col-span-11'>
//                 <h3 className='text-sm font-bold task_title'>{truncateText(task.title, 4)}</h3>
//                 <p className='text-sm text-gray-500 mt-1 task_description'>{truncateText(task.description, 6)}</p>
//                 <div className='text-sm text-gray-500 mt-1 time_remaining'>
//                     <TaskTimer task={task} />
//                 </div>
//             </Link>
//             <div className='space-y-3 col-span-1 flex flex-col'>
//                 <Link to={`/update-task/${task?._id}`}><FaPen className='text-lg' /></Link>
//                 <Link onClick={() => handleTaskDelete(task._id)}><CiTrash className='text-xl text-red-500' /></Link>
//             </div>
//         </li>
//     );
// };

// const TodaysTasks = () => {
//     const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
//     const axiosPublic = useAxiosPublic();

//     useEffect(() => {
//         axiosPublic.get('/tasks')
//             .then(res => {
//                 const fetchedTasks = Array.isArray(res.data) ? res.data : [];
//                 const sortedTasks = {
//                     todo: fetchedTasks.filter(task => task.category === 'todo').sort((a, b) => a.position - b.position),
//                     inProgress: fetchedTasks.filter(task => task.category === 'inProgress').sort((a, b) => a.position - b.position),
//                     done: fetchedTasks.filter(task => task.category === 'done').sort((a, b) => a.position - b.position),
//                 };
//                 setTasks(sortedTasks);
//             })
//             .catch(err => console.error('Error fetching tasks:', err));
//     }, []);

//     const handleTaskDelete = (id) => {
//         axiosPublic.delete(`/tasks/${id}`)
//             .then(() => {
//                 alert('Task deleted successfully');
//                 setTasks(prevTasks => ({
//                     todo: prevTasks.todo.filter(task => task._id !== id),
//                     inProgress: prevTasks.inProgress.filter(task => task._id !== id),
//                     done: prevTasks.done.filter(task => task._id !== id),
//                 }));
//             })
//             .catch(err => console.log(err));
//     };

//     const moveTask = async (fromIndex, toIndex, fromCategory, toCategory) => {
//         const fromTasks = [...tasks[fromCategory]];
//         const toTasks = fromCategory === toCategory ? fromTasks : [...tasks[toCategory]];
//         const [movedTask] = fromTasks.splice(fromIndex, 1);

//         // Update the task's category and position
//         movedTask.category = toCategory;
//         movedTask.position = toIndex;

//         // Insert the task into the new position
//         toTasks.splice(toIndex, 0, movedTask);

//         // Optimistically update the UI
//         setTasks((prevTasks) => ({
//             ...prevTasks,
//             [fromCategory]: fromTasks,
//             [toCategory]: toTasks,
//         }));

//         // Sync with the server
//         try {
//             const response = await axiosPublic.put(`/tasks/updatePosition/${movedTask._id}`, {
//                 category: toCategory,
//                 position: toIndex,
//             });

//             if (response.data.success) {
//                 console.log('Task position updated successfully on the server');
//             } else {
//                 throw new Error('Failed to update task position on the server');
//             }
//         } catch (err) {
//             console.error('Failed to update task position on the server:', err);

//             // Revert the UI if the server update fails
//             const prevTasks = { ...tasks };
//             setTasks(prevTasks);
//         }
//     };

//     const createDropTarget = (category) => {
//         const [, drop] = useDrop({
//             accept: 'TASK',
//             drop: (item) => {
//                 if (item.category !== category) {
//                     moveTask(item.index, 0, item.category, category);
//                 }
//             },
//         });
//         return drop;
//     };

//     return (
//         <main>
//             <section className='py-5'>
//                 <div className='flex items-center justify-between p-4 bg-amber-200 w-[95%] mx-auto'>
//                     <h2 className='text-2xl md:text-3xl capitalize font-semibold'>Add your tasks here..</h2>
//                 </div>

//                 <section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 mt-5 gap-3'>
//                     {['todo', 'inProgress', 'done'].map(category => (
//                         <div key={category} ref={createDropTarget(category)} className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
//                             <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>{category.replace(/([A-Z])/g, ' $1')}:</h2>
//                             <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
//                                 {tasks[category].length > 0 ? tasks[category].map((task, index) => (
//                                     <Task key={task._id} index={index} task={task} category={category} moveTask={moveTask} handleTaskDelete={handleTaskDelete} />
//                                 )) : (
//                                     <li className='text-center text-white'>No tasks in this category</li>
//                                 )}
//                             </ul>
//                         </div>
//                     ))}
//                 </section>
//             </section>
//         </main>
//     );
// };

// export default TodaysTasks;


// import React, { useState, useEffect } from 'react';
// import { FaPen } from "react-icons/fa";
// import { CiTrash } from "react-icons/ci";
// import { useDrag, useDrop } from 'react-dnd';
// import { Link } from 'react-router-dom';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import TaskTimer from '../../components/TaskTimer/TaskTimer';

// // Helper to truncate text
// const truncateText = (text = "", wordLimit) => {
//     if (!text) return "";
//     const words = text.split(" ");
//     return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + " ..." : text;
// };

// // Task component
// const Task = ({ task, index, moveTask, category, handleTaskDelete }) => {
//     const [, drag] = useDrag({
//         type: 'TASK',
//         item: { index, category, task }
//     });

//     const [, drop] = useDrop({
//         accept: 'TASK',
//         hover: (item) => {
//             if (item.index !== index || item.category !== category) {
//                 moveTask(item.index, index, item.category, category);
//                 item.index = index;
//                 item.category = category;
//             }
//         },
//         drop: (item) => {
//             if (item.index !== index || item.category !== category) {
//                 moveTask(item.index, index, item.category, category);
//             }
//         }
//     });

//     return (
//         <li ref={(node) => drag(drop(node))} className='bg-yellow-200 p-2 rounded-md grid grid-cols-12'>
//             <Link className='col-span-11'>
//                 <h3 className='text-sm font-bold task_title'>{truncateText(task.title, 4)}</h3>
//                 <p className='text-sm text-gray-500 mt-1 task_description'>{truncateText(task.description, 6)}</p>
//                 <div className='text-sm text-gray-500 mt-1 time_remaining'>
//                     <TaskTimer task={task} />
//                 </div>
//             </Link>
//             <div className='space-y-3 col-span-1 flex flex-col'>
//                 <Link to={`/update-task/${task?._id}`}><FaPen className='text-lg' /></Link>
//                 <Link onClick={() => handleTaskDelete(task._id)}><CiTrash className='text-xl text-red-500' /></Link>
//             </div>
//         </li>
//     );
// };

// // Main component
// const TodaysTasks = () => {
//     const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
//     const axiosPublic = useAxiosPublic();

//     useEffect(() => {
//         // Fetch tasks on component mount
//         axiosPublic.get('/tasks')
//             .then(res => {
//                 const fetchedTasks = Array.isArray(res.data) ? res.data : [];
//                 setTasks({
//                     todo: fetchedTasks.filter(task => task.category === "todo"),
//                     inProgress: fetchedTasks.filter(task => task.category === "inProgress"),
//                     done: fetchedTasks.filter(task => task.category === "done"),
//                 });
//             })
//             .catch(err => console.error("Error fetching tasks:", err));

//         // WebSocket Setup
//         const socket = new WebSocket('ws://localhost:5000');
//         socket.onopen = () => console.log("Connected to WebSocket server");
//         socket.onmessage = (event) => {
//             const updatedTask = JSON.parse(event.data);
//             setTasks(prevTasks => {
//                 const categoryTasks = [...prevTasks[updatedTask.category]];
//                 const taskIndex = categoryTasks.findIndex(task => task._id === updatedTask._id);
//                 if (taskIndex > -1) {
//                     categoryTasks[taskIndex] = { ...categoryTasks[taskIndex], index: updatedTask.index };
//                 }
//                 return {
//                     ...prevTasks,
//                     [updatedTask.category]: categoryTasks
//                 };
//             });
//         };
//     }, []);

//     // Delete task handler
//     const handleTaskDelete = (id) => {
//         axiosPublic.delete(`/tasks/${id}`)
//             .then(() => {
//                 alert("Task Deleted successfully");
//                 setTasks(prevTasks => ({
//                     todo: prevTasks.todo.filter(task => task._id !== id),
//                     inProgress: prevTasks.inProgress.filter(task => task._id !== id),
//                     done: prevTasks.done.filter(task => task._id !== id),
//                 }));
//             })
//             .catch(err => console.log(err));
//     };

//     // Move task handler
//     const moveTask = (fromIndex, toIndex, fromCategory, toCategory) => {
//         let updatedTasks = { ...tasks };

//         // Handle moving within the same category
//         if (fromCategory === toCategory) {
//             const categoryTasks = [...updatedTasks[fromCategory]];

//             // Remove the task from its old position and insert it at the new position
//             const [movedTask] = categoryTasks.splice(fromIndex, 1);
//             categoryTasks.splice(toIndex, 0, movedTask);

//             updatedTasks[fromCategory] = categoryTasks;
//         } else {
//             // Handle moving to a different category
//             const fromCategoryTasks = [...updatedTasks[fromCategory]];
//             const toCategoryTasks = [...updatedTasks[toCategory]];

//             // Remove the task from the 'from' category and insert it into the 'to' category
//             const [movedTask] = fromCategoryTasks.splice(fromIndex, 1);
//             toCategoryTasks.splice(toIndex, 0, movedTask);

//             updatedTasks[fromCategory] = fromCategoryTasks;
//             updatedTasks[toCategory] = toCategoryTasks;
//         }

//         // Update the task list in state
//         setTasks(updatedTasks);

//         // Get the moved task (now in the target category and position)
//         const movedTask = updatedTasks[toCategory][toIndex];

//         // Send the updated position and category to the server
//         axiosPublic.put(`/tasks/updatePosition/${movedTask._id}`, {
//             category: toCategory,
//             position: toIndex, // Set the correct position in the target category
//         })
//         .then(response => {
//             console.log("Task updated successfully on the server:", response.data);
//         })
//         .catch(err => {
//             console.error("Error updating task position:", err);

//             // If the server update fails, revert the task position in the state
//             setTasks(prevTasks => ({
//                 ...prevTasks,
//                 [fromCategory]: [...prevTasks[fromCategory]],
//                 [toCategory]: [...prevTasks[toCategory]],
//             }));
//         });
//     };


//     // Create drop target for tasks
//     const createDropTarget = (category) => {
//         const [, drop] = useDrop({
//             accept: 'TASK',
//             drop: (item) => {
//                 if (item.category !== category) {
//                     moveTask(item.index, 0, item.category, category);
//                 }
//             }
//         });
//         return drop;
//     };

//     return (
//         <main>
//             <section className='py-5'>
//                 <div className='flex items-center justify-between p-4 bg-amber-200 w-[95%] mx-auto'>
//                     <h2 className='text-2xl md:text-3xl capitalize font-semibold'>Add your tasks here..</h2>
//                 </div>

//                 <section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 mt-5 gap-3'>
//                     {['todo', 'inProgress', 'done'].map(category => (
//                         <div key={category} ref={createDropTarget(category)} className='bg-gray-500 p-2 rounded-sm h-[75vh]'>
//                             <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>{category.replace(/([A-Z])/g, ' $1')}:</h2>
//                             <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
//                                 {tasks[category] && tasks[category].length > 0 ? tasks[category].map((task, index) => (
//                                     <Task key={task._id} index={index} task={task} category={category} moveTask={moveTask} handleTaskDelete={handleTaskDelete} />
//                                 )) : (
//                                     <li className="text-center text-white">No tasks in this category</li>
//                                 )}
//                             </ul>
//                         </div>
//                     ))}
//                 </section>
//             </section>
//         </main>
//     );
// };

// export default TodaysTasks;


// import React, { useState, useEffect, useContext } from 'react';
// import { FaPen } from "react-icons/fa";
// import { CiTrash } from "react-icons/ci";
// import { useDrag, useDrop } from 'react-dnd';
// import { Link } from 'react-router-dom';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// // import TaskTimer from '../../components/TaskTimer/TaskTimer';
// import Modal from '../../components/Modal/Modal';
// import { ToDoContext } from '../../authContext/ContextApi';
// import TasksCard from '../../components/TasksCard/TasksCard';



// // Helper to truncate text
// // const truncateText = (text = "", wordLimit) => {
// //     if (!text) return "";
// //     const words = text.split(" ");
// //     return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + " ..." : text;
// // };

// // Task component
// // const Task = ({ task, index, moveTask, category, handleTaskDelete, openModal }) => {
// //     const [, drag] = useDrag({
// //         type: 'TASK',
// //         item: { index, category, task }
// //     });

// //     const [, drop] = useDrop({
// //         accept: 'TASK',
// //         hover: (item) => {
// //             if (item.index !== index || item.category !== category) {
// //                 moveTask(item.index, index, item.category, category);
// //                 item.index = index;
// //                 item.category = category;
// //             }
// //         },
// //         drop: (item) => {
// //             if (item.index !== index || item.category !== category) {
// //                 moveTask(item.index, index, item.category, category);
// //             }
// //         }
// //     });

// //     return (
// //         <li ref={(node) => drag(drop(node))} className='bg-yellow-200 p-2 rounded-md grid grid-cols-12 cursor-pointer' onClick={() => openModal(task)}>
// //             <Link className='col-span-11'>
// //                 <h3 className='text-sm font-bold task_title'>{truncateText(task.title, 4)}</h3>
// //                 <p className='text-sm text-gray-500 mt-1 task_description'>{truncateText(task.description, 6)}</p>
// //                 <div className='text-sm text-gray-500 mt-1 time_remaining'>
// //                     <TaskTimer task={task} />
// //                 </div>
// //             </Link>
// //             <div className='space-y-3 col-span-1 flex flex-col'>
// //                 <Link to={`/update-task/${task?._id}`}><FaPen className='text-lg' /></Link>
// //                 <Link onClick={(e) => {
// //                     e.stopPropagation();  
// //                     handleTaskDelete(task._id);
// //                 }}><CiTrash className='text-xl text-red-500' /></Link>
// //             </div>
// //         </li>
// //     );
// // };

// // Main component
// const TodaysTasks = () => {
//     const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
//     const [selectedTask, setSelectedTask] = useState(null);
//     const axiosPublic = useAxiosPublic();

//     const { currentUser,user } = useContext(ToDoContext)



//     useEffect(() => {
//         // Fetch tasks on component mount
//         axiosPublic.get(`/tasks/email/${user?.email || currentUser?.email}`)
//             .then(res => {
//                 const fetchedTasks = Array.isArray(res.data) ? res.data : [];
//                 setTasks({
//                     todo: fetchedTasks.filter(task => task.category === "todo"),
//                     inProgress: fetchedTasks.filter(task => task.category === "inProgress"),
//                     done: fetchedTasks.filter(task => task.category === "done"),
//                 });
//             })
//             .catch(err => console.error("Error fetching tasks:", err));

//         // WebSocket Setup
//         const socket = new WebSocket('ws://localhost:5000');
//         socket.onopen = () => console.log("Connected to WebSocket server");
//         socket.onmessage = (event) => {
//             const updatedTask = JSON.parse(event.data);
//             setTasks(prevTasks => {
//                 const categoryTasks = [...prevTasks[updatedTask.category]];
//                 const taskIndex = categoryTasks.findIndex(task => task._id === updatedTask._id);
//                 if (taskIndex > -1) {
//                     categoryTasks[taskIndex] = { ...categoryTasks[taskIndex], index: updatedTask.index };
//                 }
//                 return {
//                     ...prevTasks,
//                     [updatedTask.category]: categoryTasks
//                 };
//             });
//         };
//     }, [user,currentUser]);

//     // Delete task handler
//     const handleTaskDelete = (id) => {
//         axiosPublic.delete(`/tasks/${id}`)
//             .then(() => {
//                 alert("Task Deleted successfully");
//                 setTasks(prevTasks => ({
//                     todo: prevTasks.todo.filter(task => task._id !== id),
//                     inProgress: prevTasks.inProgress.filter(task => task._id !== id),
//                     done: prevTasks.done.filter(task => task._id !== id),
//                 }));
//             })
//             .catch(err => console.log(err));
//     };

//     // Move task handler
//     const moveTask = (fromIndex, toIndex, fromCategory, toCategory) => {
//         let updatedTasks = { ...tasks };

//         // Handle moving within the same category
//         if (fromCategory === toCategory) {
//             const categoryTasks = [...updatedTasks[fromCategory]];

//             // Remove the task from its old position and insert it at the new position
//             const [movedTask] = categoryTasks.splice(fromIndex, 1);
//             categoryTasks.splice(toIndex, 0, movedTask);

//             updatedTasks[fromCategory] = categoryTasks;
//         } else {
//             // Handle moving to a different category
//             const fromCategoryTasks = [...updatedTasks[fromCategory]];
//             const toCategoryTasks = [...updatedTasks[toCategory]];

//             // Remove the task from the 'from' category and insert it into the 'to' category
//             const [movedTask] = fromCategoryTasks.splice(fromIndex, 1);
//             toCategoryTasks.splice(toIndex, 0, movedTask);

//             updatedTasks[fromCategory] = fromCategoryTasks;
//             updatedTasks[toCategory] = toCategoryTasks;
//         }

//         // Update the task list in state
//         setTasks(updatedTasks);

//         // Get the moved task (now in the target category and position)
//         const movedTask = updatedTasks[toCategory][toIndex];

//         // Send the updated position and category to the server
//         axiosPublic.put(`/tasks/updatePosition/${movedTask._id}`, {
//             category: toCategory,
//             position: toIndex, // Set the correct position in the target category
//         })
//             .then(response => {
//                 console.log("Task updated successfully on the server:", response.data);
//             })
//             .catch(err => {
//                 console.error("Error updating task position:", err);

//                 // If the server update fails, revert the task position in the state
//                 setTasks(prevTasks => ({
//                     ...prevTasks,
//                     [fromCategory]: [...prevTasks[fromCategory]],
//                     [toCategory]: [...prevTasks[toCategory]],
//                 }));
//             });
//     };

//     // Open modal handler
//     const openModal = (task) => {
//         setSelectedTask(task);
//     };

//     // Close modal handler
//     const closeModal = () => {
//         setSelectedTask(null);
//     };

//     // Create drop target for tasks
//     const createDropTarget = (category) => {
//         const [, drop] = useDrop({
//             accept: 'TASK',
//             drop: (item) => {
//                 if (item.category !== category) {
//                     moveTask(item.index, 0, item.category, category);
//                 }
//             }
//         });
//         return drop;
//     };


//     return (
//         <main className='w-full'>
//             {currentUser?.name}
//             <section className='py-5'>
//                 <div className='flex items-center justify-between p-4 bg-amber-200 w-full mx-auto'>
//                     <h2 className='text-2xl md:text-3xl capitalize font-semibold'>Add your tasks here..</h2>
//                 </div>

//                 <section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 mt-5 gap-3'>
//                     {['todo', 'inProgress', 'done'].map(category => (
//                         <div key={category} ref={createDropTarget(category)} className='bg-gray-500 p-2 rounded-sm  h-[350px] md:h-[40vh] lg:h-[75vh]'>
//                             <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>{category.replace(/([A-Z])/g, ' $1')}:</h2>
//                             <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
//                                 {tasks[category] && tasks[category].length > 0 ? tasks[category].map((task, index) => (
//                                     <TasksCard
//                                         key={task._id}
//                                         task={task}
//                                         index={index}
//                                         category={category}
//                                         moveTask={moveTask}
//                                         handleTaskDelete={handleTaskDelete}
//                                         openModal={openModal}
//                                     />
//                                 )) : <p>No tasks available.</p>}
//                             </ul>
//                         </div>
//                     ))}
//                 </section>

//                 {/* Modal */}
//                 <Modal isOpen={selectedTask !== null} onClose={closeModal}>
//                     <h2 className="text-lg font-bold">{selectedTask?.title}</h2>
//                     <p>{selectedTask?.description}</p>
//                     {/* Add additional modal content */}
//                 </Modal>
//             </section>
//         </main>
//     );
// };

// export default TodaysTasks;


// import React, { useState, useEffect, useContext } from 'react';
// // import { FaPen } from "react-icons/fa";
// // import { CiTrash } from "react-icons/ci";
// import { useDrag, useDrop } from 'react-dnd';
// import { Link } from 'react-router-dom';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import Modal from '../../components/Modal/Modal';
// import { ToDoContext } from '../../authContext/ContextApi';
// import TasksCard from '../../components/TasksCard/TasksCard';

// // Main component
// const TodaysTasks = () => {
//     const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
//     const [selectedTask, setSelectedTask] = useState(null);
//     const axiosPublic = useAxiosPublic();

//     const { currentUser, user } = useContext(ToDoContext);

//     useEffect(() => {
//         // Fetch tasks on component mount
//         axiosPublic.get(`/tasks/email/${user?.email || currentUser?.email}`)
//             .then(res => {
//                 const fetchedTasks = Array.isArray(res.data) ? res.data : [];
//                 console.log("Fetched Tasks:", fetchedTasks); // Check the category values here
//                 setTasks({
//                     todo: fetchedTasks.filter(task => task.category === "todo"),
//                     inProgress: fetchedTasks.filter(task => task.category === "inProgress"),
//                     done: fetchedTasks.filter(task => task.category === "done"),
//                 });
//             })
//             .catch(err => console.error("Error fetching tasks:", err));

//         // WebSocket Setup
//         const socket = new WebSocket('ws://localhost:5000');
//         socket.onopen = () => console.log("Connected to WebSocket server");
//         socket.onmessage = (event) => {
//             const updatedTask = JSON.parse(event.data);
//             console.log("Updated Task from WebSocket:", updatedTask); // Log the received task
//             setTasks(prevTasks => {
//                 const categoryTasks = [...prevTasks[updatedTask.category]];
//                 const taskIndex = categoryTasks.findIndex(task => task._id === updatedTask._id);
//                 if (taskIndex > -1) {
//                     categoryTasks[taskIndex] = { ...categoryTasks[taskIndex], index: updatedTask.index };
//                 }
//                 return {
//                     ...prevTasks,
//                     [updatedTask.category]: categoryTasks
//                 };
//             });
//         };

//         return () => {
//             // Clean up the WebSocket connection
//             socket.close();
//         };
//     }, [user, currentUser]);

//     // Delete task handler
//     const handleTaskDelete = (id) => {
//         axiosPublic.delete(`/tasks/${id}`)
//             .then(() => {
//                 alert("Task Deleted successfully");
//                 setTasks(prevTasks => ({
//                     todo: prevTasks.todo.filter(task => task._id !== id),
//                     inProgress: prevTasks.inProgress.filter(task => task._id !== id),
//                     done: prevTasks.done.filter(task => task._id !== id),
//                 }));
//             })
//             .catch(err => console.log(err));
//     };

//     // Move task handler
//     const moveTask = (fromIndex, toIndex, fromCategory, toCategory) => {
//         let updatedTasks = { ...tasks };

//         // Handle moving within the same category
//         if (fromCategory === toCategory) {
//             const categoryTasks = [...updatedTasks[fromCategory]];

//             // Remove the task from its old position and insert it at the new position
//             const [movedTask] = categoryTasks.splice(fromIndex, 1);
//             categoryTasks.splice(toIndex, 0, movedTask);

//             updatedTasks[fromCategory] = categoryTasks;
//         } else {
//             // Handle moving to a different category
//             const fromCategoryTasks = [...updatedTasks[fromCategory]];
//             const toCategoryTasks = [...updatedTasks[toCategory]];

//             // Remove the task from the 'from' category and insert it into the 'to' category
//             const [movedTask] = fromCategoryTasks.splice(fromIndex, 1);
//             toCategoryTasks.splice(toIndex, 0, movedTask);

//             updatedTasks[fromCategory] = fromCategoryTasks;
//             updatedTasks[toCategory] = toCategoryTasks;
//         }

//         // Update the task list in state
//         setTasks(updatedTasks);

//         // Get the moved task (now in the target category and position)
//         const movedTask = updatedTasks[toCategory][toIndex];

//         // Send the updated position and category to the server
//         axiosPublic.put(`/tasks/updatePosition/${movedTask._id}`, {
//             category: toCategory,
//             position: toIndex,
//         })
//             .then(response => {
//                 console.log("Task updated successfully on the server:", response.data);
//             })
//             .catch(err => {
//                 console.error("Error updating task position:", err);

//                 // If the server update fails, revert the task position in the state
//                 setTasks(prevTasks => ({
//                     ...prevTasks,
//                     [fromCategory]: [...prevTasks[fromCategory]],
//                     [toCategory]: [...prevTasks[toCategory]],
//                 }));
//             });
//     };

//     // Open modal handler
//     const openModal = (task) => {
//         setSelectedTask(task);
//     };

//     // Close modal handler
//     const closeModal = () => {
//         setSelectedTask(null);
//     };

//     // Create drop target for tasks
//     const createDropTarget = (category) => {
//         const [, drop] = useDrop({
//             accept: 'TASK',
//             drop: (item) => {
//                 if (item.category !== category) {
//                     moveTask(item.index, 0, item.category, category);
//                 }
//             }
//         });
//         return drop;
//     };

//     return (
//         <main className='w-full'>
//             {currentUser?.name}
//             <section className='py-5'>
//                 <div className='flex items-center justify-between p-4 bg-amber-200 w-full mx-auto'>
//                     <h2 className='text-2xl md:text-3xl capitalize font-semibold'>Add your tasks here..</h2>
//                 </div>

//                 <section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 mt-5 gap-3'>
//                     {['todo', 'inProgress', 'done'].map(category => (
//                         <div key={category} ref={createDropTarget(category)} className='bg-gray-500 p-2 rounded-sm  h-[350px] md:h-[40vh] lg:h-[75vh]'>
//                             <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>{category.replace(/([A-Z])/g, ' $1')}:</h2>
//                             <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
//                                 {tasks[category] && tasks[category].length > 0 ? tasks[category].map((task, index) => (
//                                     <TasksCard
//                                         key={task._id}
//                                         task={task}
//                                         index={index}
//                                         category={category}
//                                         moveTask={moveTask}
//                                         handleTaskDelete={handleTaskDelete}
//                                         openModal={openModal}
//                                     />
//                                 )) : <p>No tasks available.</p>}
//                             </ul>
//                         </div>
//                     ))}
//                 </section>

//                 {/* Modal */}
//                 <Modal isOpen={selectedTask !== null} onClose={closeModal}>
//                     <h2 className="text-lg font-bold">{selectedTask?.title}</h2>
//                     <p>{selectedTask?.description}</p>
//                     {/* Add additional modal content */}
//                 </Modal>
//             </section>
//         </main>
//     );
// };

// export default TodaysTasks;



// import React, { useState, useEffect, useContext } from 'react';
// import { useDrop } from 'react-dnd';
// import { Link } from 'react-router-dom';
// import useAxiosPublic from '../../hooks/useAxiosPublic';
// import Modal from '../../components/Modal/Modal';
// import { ToDoContext } from '../../authContext/ContextApi';
// import TasksCard from '../../components/TasksCard/TasksCard';

// // Main component
// const TodaysTasks = () => {
//     const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
//     const [selectedTask, setSelectedTask] = useState(null);
//     const axiosPublic = useAxiosPublic();

//     const { currentUser, user } = useContext(ToDoContext);

//     useEffect(() => {
//         // Fetch tasks on component mount
//         axiosPublic.get(`/tasks/email/${user?.email || currentUser?.email}`)
//             .then(res => {
//                 const fetchedTasks = Array.isArray(res.data) ? res.data : [];
//                 console.log("Fetched Tasks:", fetchedTasks); // Check the category values here
//                 setTasks({
//                     todo: fetchedTasks.filter(task => task.category === "todo"),
//                     inProgress: fetchedTasks.filter(task => task.category === "inProgress"),
//                     done: fetchedTasks.filter(task => task.category === "done"),
//                 });
//             })
//             .catch(err => console.error("Error fetching tasks:", err));

//         // WebSocket Setup
//         const socket = new WebSocket('ws://localhost:5000');
//         socket.onopen = () => console.log("Connected to WebSocket server");
//         socket.onmessage = (event) => {
//             const updatedTask = JSON.parse(event.data);
//             console.log("Updated Task from WebSocket:", updatedTask); // Log the received task
//             setTasks(prevTasks => {
//                 const categoryTasks = [...prevTasks[updatedTask.category]];
//                 const taskIndex = categoryTasks.findIndex(task => task._id === updatedTask._id);
//                 if (taskIndex > -1) {
//                     categoryTasks[taskIndex] = updatedTask;
//                 }
//                 return {
//                     ...prevTasks,
//                     [updatedTask.category]: categoryTasks
//                 };
//             });
//         };

//         return () => {
//             // Clean up the WebSocket connection
//             socket.close();
//         };
//     }, [user, currentUser]);

//     // Delete task handler
//     const handleTaskDelete = (id) => {
//         axiosPublic.delete(`/tasks/${id}`)
//             .then(() => {
//                 alert("Task Deleted successfully");
//                 setTasks(prevTasks => ({
//                     todo: prevTasks.todo.filter(task => task._id !== id),
//                     inProgress: prevTasks.inProgress.filter(task => task._id !== id),
//                     done: prevTasks.done.filter(task => task._id !== id),
//                 }));
//             })
//             .catch(err => console.log(err));
//     };

//     // Move task handler
//     const moveTask = (fromIndex, toIndex, fromCategory, toCategory) => {
//         let updatedTasks = { ...tasks };

//         // Handle moving within the same category
//         if (fromCategory === toCategory) {
//             const categoryTasks = [...updatedTasks[fromCategory]];

//             // Remove the task from its old position and insert it at the new position
//             const [movedTask] = categoryTasks.splice(fromIndex, 1);
//             categoryTasks.splice(toIndex, 0, movedTask);

//             updatedTasks[fromCategory] = categoryTasks;
//         } else {
//             // Handle moving to a different category
//             const fromCategoryTasks = [...updatedTasks[fromCategory]];
//             const toCategoryTasks = [...updatedTasks[toCategory]];

//             // Remove the task from the 'from' category and insert it into the 'to' category
//             const [movedTask] = fromCategoryTasks.splice(fromIndex, 1);
//             toCategoryTasks.splice(toIndex, 0, movedTask);

//             updatedTasks[fromCategory] = fromCategoryTasks;
//             updatedTasks[toCategory] = toCategoryTasks;
//         }

//         // Update the task list in state
//         setTasks(updatedTasks);

//         // Get the moved task (now in the target category and position)
//         const movedTask = updatedTasks[toCategory][toIndex];

//         // Send the updated position and category to the server
//         axiosPublic.put(`/tasks/updatePosition/${movedTask._id}`, {
//             category: toCategory,
//             position: toIndex,
//         })
//             .then(response => {
//                 console.log("Task updated successfully on the server:", response.data);
//             })
//             .catch(err => {
//                 console.error("Error updating task position:", err);

//                 // If the server update fails, revert the task position in the state
//                 setTasks(prevTasks => ({
//                     ...prevTasks,
//                     [fromCategory]: [...prevTasks[fromCategory]],
//                     [toCategory]: [...prevTasks[toCategory]],
//                 }));
//             });
//     };

//     // Open modal handler
//     const openModal = (task) => {
//         setSelectedTask(task);
//     };

//     // Close modal handler
//     const closeModal = () => {
//         setSelectedTask(null);
//     };

//     // Create drop target for tasks
//     const createDropTarget = (category) => {
//         const [, drop] = useDrop({
//             accept: 'TASK',
//             drop: (item) => {
//                 if (item.category !== category) {
//                     moveTask(item.index, 0, item.category, category);
//                 }
//             }
//         });
//         return drop;
//     };

//     return (
//         <main className='w-full'>
//             {currentUser?.name}
//             <section className='py-5'>
//                 <div className='flex items-center justify-between p-4 bg-amber-200 w-full mx-auto'>
//                     <h2 className='text-2xl md:text-3xl capitalize font-semibold'>Add your tasks here..</h2>
//                 </div>

//                 <section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 mt-5 gap-3'>
//                     {['todo', 'inProgress', 'done'].map(category => (
//                         <div key={category} ref={createDropTarget(category)} className='bg-gray-500 p-2 rounded-sm  h-[350px] md:h-[40vh] lg:h-[75vh]'>
//                             <h2 className='capitalize text-xl md:text-2xl font-semibold pb-3 text-white'>{category.replace(/([A-Z])/g, ' $1')}:</h2>
//                             <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)] no-scrollbar'>
//                                 {tasks[category] && tasks[category].length > 0 ? tasks[category]
//                                     .map((task, index) => (
//                                         <TasksCard
//                                             key={task._id}
//                                             task={task}
//                                             index={index}
//                                             category={category}
//                                             moveTask={moveTask}
//                                             handleTaskDelete={handleTaskDelete}
//                                             openModal={openModal}
//                                         />
//                                     )) : <p>No tasks available.</p>}
//                             </ul>
//                         </div>
//                     ))}
//                 </section>

//                 {/* Modal */}
//                 <Modal isOpen={selectedTask !== null} onClose={closeModal}>
//                     <h2 className="text-lg font-bold">{selectedTask?.title}</h2>
//                     <p>{selectedTask?.description}</p>
//                     {/* Add additional modal content */}
//                 </Modal>
//             </section>
//         </main>
//     );
// };

// export default TodaysTasks;




import React, { useState, useEffect, useContext } from 'react';
import { useDrop } from 'react-dnd';
import { ToDoContext } from '../../authContext/ContextApi';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Modal from '../../components/Modal/Modal';
import TasksCard from '../../components/TasksCard/TasksCard';

const TodaysTasks = () => {
    const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
    const [selectedTask, setSelectedTask] = useState(null);
    const axiosPublic = useAxiosPublic();
    const { currentUser, user,theme } = useContext(ToDoContext);
    const [socket, setSocket] = useState(null);

    const moveTask = (task, toCategory) => {
        if (!task || !task._id) {
            console.error("Invalid task object:", task);
            return;
        }
    
        setTasks(prevTasks => {
            const updatedTasks = { ...prevTasks };
    
            // Remove task from current category
            updatedTasks[task.category] = updatedTasks[task.category].filter(t => t._id !== task._id);
    
            // Update task category
            task.category = toCategory;
    
            // Insert task at the new position in the same category or a different category
            const targetCategory = updatedTasks[toCategory] || [];
            targetCategory.push(task);
            updatedTasks[toCategory] = targetCategory;
    
            // Send updated position to backend
            axiosPublic.put(`/tasks/updatePosition/${task._id}`, {
                category: toCategory,
                position: targetCategory.length - 1, // Position of the task in the new category
            }).catch(err => console.error("Error updating task position:", err));
    
            return updatedTasks;
        });
    };
    
    
    useEffect(() => {
        // Fetch tasks from the database
        axiosPublic.get(`/tasks/email/${user?.email || currentUser?.email}`)
            .then(res => {
                const fetchedTasks = Array.isArray(res.data) ? res.data : [];
                fetchedTasks.sort((a, b) => a.position - b.position); // Sort tasks by position
                setTasks({
                    todo: fetchedTasks.filter(task => task.category === "todo"),
                    inProgress: fetchedTasks.filter(task => task.category === "inProgress"),
                    done: fetchedTasks.filter(task => task.category === "done"),
                });
            })
            .catch(err => console.error("Error fetching tasks:", err));
    
        // WebSocket connection
        const newSocket = new WebSocket('ws://localhost:5000');
        setSocket(newSocket);
    
        newSocket.onopen = () => console.log("Connected to WebSocket server");
    
        newSocket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("WebSocket Update:", data);
    
           
            if (data.type === 'taskUpdated') {
                setTasks(prevTasks => {
                    const updatedTasks = { ...prevTasks };
            
                    // Remove task from old category
                    for (const category in updatedTasks) {
                        updatedTasks[category] = updatedTasks[category].filter(t => t._id !== data.task._id);
                    }
            
                    // Add task to the same category but at the updated position
                    updatedTasks[data.task.category] = [...updatedTasks[data.task.category]];
            
                    // Insert the task at the updated position in the correct category
                    updatedTasks[data.task.category].splice(data.task.position, 0, data.task);
            
                    return updatedTasks;
                });
            }
            

        };
    
        return () => {
            newSocket.close();
        };
    }, [user, currentUser]);
    
    
    // Move task within the same category (reordering)
const moveTaskWithinCategory = (task, newPosition) => {
    if (!task || !task._id) {
        console.error("Invalid task object:", task);
        return;
    }

    setTasks(prevTasks => {
        const updatedTasks = { ...prevTasks };

        // Remove the task from its current position
        updatedTasks[task.category] = updatedTasks[task.category].filter(t => t._id !== task._id);

        // Insert the task at the new position
        updatedTasks[task.category].splice(newPosition, 0, task);

        return updatedTasks;
    });

    // Send the updated position to the server for same category reordering
    axiosPublic.put(`/tasks/updatePositionWithinCategory/${task._id}`, {
        category: task.category,
        newPosition: newPosition, // Send new position in the same category
    }).catch(err => console.error("Error updating task position within category:", err));
};


    // Drop target for categories
    const createDropTarget = (category) => {
        const [, drop] = useDrop({
            accept: 'TASK',
            drop: (item) => moveTask(item.task, category),
        });
        return drop;
    };

    // Delete task handler
    const handleTaskDelete = (id) => {
        axiosPublic.delete(`/tasks/${id}`)
            .then(() => {
                alert("Task Deleted successfully");
                setTasks(prevTasks => ({
                    todo: prevTasks.todo.filter(task => task._id !== id),
                    inProgress: prevTasks.inProgress.filter(task => task._id !== id),
                    done: prevTasks.done.filter(task => task._id !== id),
                }));
            })
            .catch(err => console.log(err));
    };

    return (
        <main className='w-full'>
            <section className='py-5'>
                <div className={`flex items-center justify-between p-4  text-[#FBFBFB] ${theme === 'dark' ? " text-white" : 'bg-[#91AC8F] text-black'}`}>
                    <h2 className='text-xl md:text-2xl font-semibold uppercase'>Add your task {currentUser?.name}</h2>
                </div>

                <section className='w-[95%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 mt-5'>
                    {['todo', 'inProgress', 'done'].map(category => (
                        <div key={category} ref={createDropTarget(category)} className='border-[1px] border-[#66785F]  p-2 rounded-sm h-[75vh]'>
                            <h2 className={`text-xl md:text-2xl font-semibold text-black pb-2 ${theme === 'dark' ? " text-white" : ' text-black'}`}>{category}:</h2>
                            <ul className='space-y-3 overflow-y-auto h-[calc(75vh-70px)]'>
                                {tasks[category]?.map((task) => (
                                    <TasksCard
                                        key={task._id}
                                        task={task}
                                        category={category}
                                        moveTask={moveTask}
                                        handleTaskDelete={handleTaskDelete}
                                        openModal={() => setSelectedTask(task)}
                                    />
                                )) || <p>No tasks available.</p>}
                            </ul>
                        </div>
                    ))}
                </section>

                <Modal isOpen={!!selectedTask} onClose={() => setSelectedTask(null)}>
                    <h2 className="text-lg font-bold">{selectedTask?.title}</h2>
                    <p>{selectedTask?.description}</p>
                </Modal>
            </section>
        </main>
    );
};

export default TodaysTasks;
 