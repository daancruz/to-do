import { useEffect, useRef } from "react";

const Card = ({ tasks, setTasks, allTasks, onDeleteClick }) => {
    
    const addContent = (id, newContent) => {
        const updateTasks = allTasks.map(task =>
            task.id === id ? { ...task, content: newContent } : task
        );
        setTasks(updateTasks);
    }

    const toggleRunning = (id) => {
        const updateTasks = allTasks.map((task) => {
            return task.id === id
                ? task.progress === '' || task.progress === 'done'
                    ? { ...task, progress: 'running' }
                    : { ...task, progress: '' }
                : task;
        });
        setTasks(updateTasks);
    };
    const toggleDone = (id) => {
        const updateTasks = allTasks.map((task) => {
            return task.id === id
                ? task.progress === '' || task.progress === 'running'
                    ? { ...task, progress: 'done' }
                    : { ...task, progress: '' }
                : task;
        });
        setTasks(updateTasks);
    };

    const textareaRefs = useRef({});
    useEffect(() => {
        tasks.forEach(task => {
            const textarea = textareaRefs.current[task.id];

            if(textarea) {
                textarea.style.height =  'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
            }
        })
    },[tasks]);

    return (
        <>
            <ul>
                {
                    tasks.map((task) => (
                        <li className="task-card" key={task.id}>
                            <div className="header">
                                <p>{task.task}</p>
                                { 
                                    task.priority === 'normal' ? (<span className="badge normal-priority">normal</span>)
                                    : task.priority === 'important' ? (<span className="badge important-priority">média</span>)
                                    : (<span className="badge urgent-priority">alta</span>)
                                }
                            </div>
                            <textarea
                                ref={(el) => (textareaRefs.current[task.id] = el)}
                                disabled={task.progress === 'done'}
                                value={task.content}
                                onChange={(e) => addContent(task.id, e.target.value)}
                            />
                            <label htmlFor={`andamento${task.id}`}>
                                <input
                                    type="checkbox"
                                    id={`andamento${task.id}`}
                                    checked={task.progress === 'running'}
                                    onChange={(e) => toggleRunning(task.id, e.target.value)}
                                />
                                <span>Em andamento</span>
                            </label>

                            <label htmlFor={`concluido${task.id}`}>
                                <input
                                    type="checkbox"
                                    id={`concluido${task.id}`}
                                    checked={task.progress === 'done'}
                                    onChange={(e) => toggleDone(task.id, e.target.value)}
                                />
                                <span>Concluído</span>
                            </label>
                            <button className='btn btn-danger' onClick={() => onDeleteClick(task.id)}>
                                    <i class="fa-solid fa-trash"></i>
                            </button>
                        </li>
                    ))
                }
            </ul>
            
        </>

    )
}

export default Card
