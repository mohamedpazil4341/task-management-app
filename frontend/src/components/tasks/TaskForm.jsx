import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Plus } from 'lucide-react';
import { useTasks } from '../../context/TaskContext';
import Input from '../ui/Input';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import { STATUS_LABELS, PRIORITY_LABELS } from '../../utils/constants';

const TaskForm = ({ isOpen, onClose, editTask = null }) => {
  const { createTask, updateTask } = useTasks();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isEditing = !!editTask;

  const [formData, setFormData] = useState({
    title: '', description: '', status: 'pending', priority: 'medium', dueDate: '',
  });

  useEffect(() => {
    if (editTask) {
      setFormData({
        title: editTask.title || '', description: editTask.description || '',
        status: editTask.status || 'pending', priority: editTask.priority || 'medium',
        dueDate: editTask.dueDate ? new Date(editTask.dueDate).toISOString().split('T')[0] : '',
      });
    } else {
      setFormData({ title: '', description: '', status: 'pending', priority: 'medium', dueDate: '' });
    }
    setErrors({});
  }, [editTask, isOpen]);

  const validate = () => {
    const e = {};
    if (!formData.title.trim()) e.title = 'Task title is required';
    if (formData.description.length > 500) e.description = 'Max 500 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const taskData = { ...formData, dueDate: formData.dueDate || null };
      if (isEditing) await updateTask(editTask._id, taskData);
      else await createTask(taskData);
      onClose();
    } catch (err) { /* toast handled by context */ } finally { setLoading(false); }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? 'Edit Task' : 'Create New Task'} size="md">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input id="task-title" label="Task Title" name="title" placeholder="Enter task title..." value={formData.title} onChange={handleChange} error={errors.title} />
        <div className="space-y-1.5">
          <label htmlFor="task-desc" className="block text-sm font-medium text-surface-700 dark:text-surface-300">Description</label>
          <textarea id="task-desc" name="description" rows={3} placeholder="Add task details..." value={formData.description} onChange={handleChange} className="input-field resize-none" />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          <p className="text-xs text-surface-400 text-right">{formData.description.length}/500</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="task-status" className="block text-sm font-medium text-surface-700 dark:text-surface-300">Status</label>
            <select id="task-status" name="status" value={formData.status} onChange={handleChange} className="input-field">
              {Object.entries(STATUS_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="task-priority" className="block text-sm font-medium text-surface-700 dark:text-surface-300">Priority</label>
            <select id="task-priority" name="priority" value={formData.priority} onChange={handleChange} className="input-field">
              {Object.entries(PRIORITY_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </div>
        </div>
        <Input id="task-duedate" label="Due Date" type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-surface-200 dark:border-surface-700">
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary" loading={loading} icon={isEditing ? Save : Plus}>
            {isEditing ? 'Save Changes' : 'Create Task'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default TaskForm;
