// ProfilePage — User profile view and edit
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { formatDate, getInitials } from '../utils/helpers';

const ProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData = { name: formData.name, email: formData.email };
      if (formData.password) updateData.password = formData.password;
      await updateProfile(updateData);
      setEditing(false);
      setFormData((p) => ({ ...p, password: '' }));
    } catch (err) { /* handled by context */ } finally { setLoading(false); }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-surface-900 dark:text-white">Profile</h1>

      {/* Avatar Card */}
      <div className="glass rounded-2xl p-8 text-center">
        <div className="w-24 h-24 mx-auto rounded-2xl gradient-primary flex items-center justify-center text-white text-3xl font-bold shadow-glow mb-4">
          {getInitials(user?.name)}
        </div>
        <h2 className="text-xl font-bold text-surface-900 dark:text-white">{user?.name}</h2>
        <p className="text-surface-500 dark:text-surface-400">{user?.email}</p>
        <div className="flex items-center justify-center gap-1 mt-2 text-sm text-surface-400">
          <Calendar className="w-4 h-4" />
          Joined {formatDate(user?.createdAt)}
        </div>
      </div>

      {/* Edit Form */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Account Settings</h3>
          {!editing && (
            <Button variant="secondary" size="sm" onClick={() => setEditing(true)}>Edit</Button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input id="profile-name" label="Name" name="name" icon={User} value={formData.name} onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))} />
            <Input id="profile-email" label="Email" type="email" name="email" icon={Mail} value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
            <Input id="profile-pass" label="New Password (optional)" type="password" name="password" placeholder="Leave blank to keep current" value={formData.password} onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))} />
            <div className="flex gap-3 pt-2">
              <Button variant="secondary" onClick={() => { setEditing(false); setFormData({ name: user?.name || '', email: user?.email || '', password: '' }); }}>Cancel</Button>
              <Button type="submit" variant="primary" loading={loading} icon={Save}>Save Changes</Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div><p className="text-xs uppercase tracking-wider text-surface-400 mb-1">Name</p><p className="text-surface-900 dark:text-white font-medium">{user?.name}</p></div>
            <div><p className="text-xs uppercase tracking-wider text-surface-400 mb-1">Email</p><p className="text-surface-900 dark:text-white font-medium">{user?.email}</p></div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfilePage;
