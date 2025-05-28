import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card/Card';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';


function App() {
  const [newtask, setNewtask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [priority, setPriority] = useState('normal');

  const todoTasks = tasks.filter(task => task.progress === '');
  const runningTasks = tasks.filter(task => task.progress === 'running');
  const doneTasks = tasks.filter(task => task.progress === 'done');
  const [taskToDelete, setTaskToDelete] = useState(null);

  const removeTask = (id) => {
    const updateTasks = tasks.filter(task => task.id !== id);
    setTasks(updateTasks);
    setTaskToDelete(null);
  };

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks && savedTasks !== '[]') {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newtask.trim()) return;

    const task = {
      id: Date.now(),
      task: newtask,
      content: '',
      progress: '',
      priority: priority,
      createdAt: new Date().toLocaleString(),
    };

    setTasks([...tasks, task])
    setNewtask('');
    setPriority('normal');
  }

  return (
    <>
      <Header />
      <main className='row'>
        <div className="task-column col-12 col-md-4 mb-3 mb-md-0">
          <div className='content'>
            <div className="title">
              <img src="./assets/img/task-list.png" alt="Lista de tarefas" />
              <h3>Tarefas</h3>
            </div>
            <div className='input'>
              <input
                type="text"
                value={newtask}
                placeholder='Digite a tarefa'
                onChange={(e) => setNewtask(e.target.value)}
              />
              <button className='btn btn-success' onClick={addTask}> <i className="fa-solid fa-plus"></i></button>
            </div>
            <div className='priority'>
              <button className={`badge normal-priority ${priority === 'normal' ? 'active' : ''}`} onClick={(e) => setPriority('normal')}>normal</button>
              <button className={`badge important-priority mx-1 ${priority === 'important' ? 'active' : ''}`} onClick={(e) => setPriority('important')}>média</button>
              <button className={`badge urgent-priority ${priority === 'urgent' ? 'active' : ''}`} onClick={(e) => setPriority('urgent')}>alta</button>
            </div>
            <Card
              tasks={todoTasks}
              setTasks={setTasks}
              allTasks={tasks}
              onDeleteClick={setTaskToDelete}
            />
          </div>

        </div>
        <div className="task-column col-12 col-md-4 mb-3 mb-md-0">
          <div className='content'>
            <div className="title">
              <img src="./assets/img/task-running.png" alt="Tarefas em andamento" />
              <h3>Andamento</h3>
            </div>
            <Card
              tasks={runningTasks}
              setTasks={setTasks}
              allTasks={tasks}
              onDeleteClick={setTaskToDelete}
            />
          </div>
        </div>
        <div className="task-column col-12 col-md-4 mb-3 mb-md-0">
          <div className='content'>
            <div className="title">
              <img src="./to-do/assets/img/task-done.png" alt="Tarefas finalizadas" />
              <h3>Concluída</h3>
            </div>
            <Card
              tasks={doneTasks}
              setTasks={setTasks}
              allTasks={tasks}
              onDeleteClick={setTaskToDelete}
            />
          </div>
        </div>
        {taskToDelete !== null && (
          <div className="modal fade show" id={`deleteModal${taskToDelete}`} style={{ display: 'block' }}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header bg-warning">
                  <h1 className="modal-title fs-5 ms-auto">
                    <img src="./assets/img/atencao.png" alt="icone de atenção" />
                    EI, PSIU</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setTaskToDelete(null)}></button>
                </div>
                <div className="modal-body">
                  <p>Você deseja apagar essa tarefa? Você não poderá reverter esta ação.</p>
                  <p>Se desejar voltar, basta me fechar no "x"</p>

                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-danger" onClick={() => removeTask(taskToDelete)} data-bs-dismiss="modal">
                    Apagar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {taskToDelete !== null && (
          <div className="backdrop"></div>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
