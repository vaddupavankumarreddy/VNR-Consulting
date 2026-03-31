import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, Plus, Pencil, Trash2, LogOut, Briefcase, Users, MessageSquare } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Database } from '@/integrations/supabase/types';

type Job = Database['public']['Tables']['jobs']['Row'];
type JobInsert = Database['public']['Tables']['jobs']['Insert'];
type Application = Database['public']['Tables']['candidate_applications']['Row'];
type Contact = Database['public']['Tables']['contact_submissions']['Row'];

const JOB_TYPES = ['FTE', 'W2', 'C2C'] as const;

function JobForm({ job, onSave, onCancel }: { job?: Job; onSave: (j: JobInsert & { id?: string }) => void; onCancel: () => void }) {
  const [form, setForm] = useState({
    title: job?.title || '',
    location: job?.location || '',
    type: job?.type || 'FTE',
    salary: job?.salary || '',
    category: job?.category || '',
    is_active: job?.is_active ?? true,
  });

  const inputClass = "w-full bg-background border border-border rounded-lg px-3 py-2 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50";

  return (
    <div className="bg-card border border-border rounded-xl p-6 mb-6">
      <h3 className="font-heading font-bold text-lg mb-4">{job ? 'Edit Job' : 'Add New Job'}</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Job Title *" className={inputClass} />
        <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Location *" className={inputClass} />
        <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value as typeof form.type })} className={inputClass}>
          {JOB_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <input value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} placeholder="Salary (e.g. ₹18L - ₹25L) *" className={inputClass} />
        <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Category *" className={inputClass} />
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={form.is_active} onChange={e => setForm({ ...form, is_active: e.target.checked })} className="rounded" />
          Active (visible to candidates)
        </label>
      </div>
      <div className="flex gap-3 mt-4">
        <button
          onClick={() => {
            if (!form.title || !form.location || !form.salary || !form.category) {
              toast.error('Please fill all required fields');
              return;
            }
            onSave({ ...form, ...(job ? { id: job.id } : {}) });
          }}
          className="bg-gradient-cta text-primary-foreground font-heading font-semibold px-6 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm"
        >
          {job ? 'Update' : 'Create'}
        </button>
        <button onClick={onCancel} className="border border-border text-muted-foreground px-6 py-2 rounded-lg hover:bg-muted transition-colors text-sm">
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<'jobs' | 'applications' | 'contacts'>('jobs');
  const [showForm, setShowForm] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { navigate('/admin/login'); return; }
      const { data: roles } = await supabase.from('user_roles').select('role').eq('user_id', user.id).eq('role', 'admin');
      if (!roles || roles.length === 0) { navigate('/admin/login'); return; }
      setAuthChecked(true);
    };
    checkAuth();
  }, [navigate]);

  const { data: jobs = [], isLoading: jobsLoading } = useQuery({
    queryKey: ['admin-jobs'],
    queryFn: async () => {
      const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: authChecked,
  });

  const { data: applications = [], isLoading: appsLoading } = useQuery({
    queryKey: ['admin-applications'],
    queryFn: async () => {
      const { data, error } = await supabase.from('candidate_applications').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: authChecked,
  });

  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: authChecked,
  });

  const handleSaveJob = async (jobData: JobInsert & { id?: string }) => {
    try {
      if (jobData.id) {
        const { id, ...rest } = jobData;
        const { error } = await supabase.from('jobs').update(rest).eq('id', id);
        if (error) throw error;
        toast.success('Job updated');
      } else {
        const { error } = await supabase.from('jobs').insert(jobData);
        if (error) throw error;
        toast.success('Job created');
      }
      queryClient.invalidateQueries({ queryKey: ['admin-jobs'] });
      queryClient.invalidateQueries({ queryKey: ['public-jobs'] });
      setShowForm(false);
      setEditingJob(undefined);
    } catch {
      toast.error('Failed to save job');
    }
  };

  const handleDeleteJob = async (id: string) => {
    if (!confirm('Delete this job posting?')) return;
    const { error } = await supabase.from('jobs').delete().eq('id', id);
    if (error) { toast.error('Failed to delete'); return; }
    toast.success('Job deleted');
    queryClient.invalidateQueries({ queryKey: ['admin-jobs'] });
  };

  const handleDeleteApplication = async (id: string) => {
    if (!confirm('Delete this application?')) return;
    const { error } = await supabase.from('candidate_applications').delete().eq('id', id);
    if (error) { toast.error('Failed to delete'); return; }
    toast.success('Application deleted');
    queryClient.invalidateQueries({ queryKey: ['admin-applications'] });
  };

  const handleDeleteContact = async (id: string) => {
    if (!confirm('Delete this submission?')) return;
    const { error } = await supabase.from('contact_submissions').delete().eq('id', id);
    if (error) { toast.error('Failed to delete'); return; }
    toast.success('Submission deleted');
    queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (!authChecked) {
    return <div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" size={32} /></div>;
  }

  const tabClass = (t: string) =>
    `px-4 py-2 rounded-lg font-heading font-semibold text-sm transition-colors flex items-center gap-2 ${tab === t ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'}`;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="font-heading text-xl font-bold">VNR Admin Dashboard</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-heading text-primary">{jobs.length}</p>
            <p className="text-xs text-muted-foreground">Job Postings</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-heading text-secondary">{applications.length}</p>
            <p className="text-xs text-muted-foreground">Applications</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-bold font-heading text-accent">{contacts.length}</p>
            <p className="text-xs text-muted-foreground">Contact Leads</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button className={tabClass('jobs')} onClick={() => setTab('jobs')}><Briefcase size={16} /> Jobs</button>
          <button className={tabClass('applications')} onClick={() => setTab('applications')}><Users size={16} /> Applications</button>
          <button className={tabClass('contacts')} onClick={() => setTab('contacts')}><MessageSquare size={16} /> Contacts</button>
        </div>

        {/* Jobs Tab */}
        {tab === 'jobs' && (
          <div>
            {!showForm && (
              <button
                onClick={() => { setEditingJob(undefined); setShowForm(true); }}
                className="mb-4 bg-gradient-cta text-primary-foreground font-heading font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm flex items-center gap-2"
              >
                <Plus size={16} /> Add Job
              </button>
            )}
            {showForm && (
              <JobForm
                job={editingJob}
                onSave={handleSaveJob}
                onCancel={() => { setShowForm(false); setEditingJob(undefined); }}
              />
            )}
            {jobsLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" size={24} /></div>
            ) : (
              <div className="space-y-3">
                {jobs.map(job => (
                  <div key={job.id} className="bg-card border border-border rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-sm">{job.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${job.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {job.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{job.location} · {job.type} · {job.salary} · {job.category}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingJob(job); setShowForm(true); }} className="p-2 text-muted-foreground hover:text-primary transition-colors"><Pencil size={16} /></button>
                      <button onClick={() => handleDeleteJob(job.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Applications Tab */}
        {tab === 'applications' && (
          <div>
            {appsLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" size={24} /></div>
            ) : applications.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No applications yet.</p>
            ) : (
              <div className="space-y-3">
                {applications.map((app: Application) => (
                  <div key={app.id} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-heading font-bold text-sm">{app.full_name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{app.email} · {app.phone}</p>
                        <p className="text-xs text-muted-foreground">Position: {app.position} · Experience: {app.experience}</p>
                        {app.resume_link && (
                          <a href={app.resume_link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline mt-1 inline-block">View Resume →</a>
                        )}
                        {app.message && <p className="text-xs text-muted-foreground mt-2 italic">"{app.message}"</p>}
                        <p className="text-[10px] text-muted-foreground mt-2">{new Date(app.created_at).toLocaleString()}</p>
                      </div>
                      <button onClick={() => handleDeleteApplication(app.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {tab === 'contacts' && (
          <div>
            {contactsLoading ? (
              <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" size={24} /></div>
            ) : contacts.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No contact submissions yet.</p>
            ) : (
              <div className="space-y-3">
                {contacts.map((c: Contact) => (
                  <div key={c.id} className="bg-card border border-border rounded-xl p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-heading font-bold text-sm">{c.name}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{c.email} · {c.phone}</p>
                        {c.message && <p className="text-xs text-muted-foreground mt-2 italic">"{c.message}"</p>}
                        <p className="text-[10px] text-muted-foreground mt-2">{new Date(c.created_at).toLocaleString()}</p>
                      </div>
                      <button onClick={() => handleDeleteContact(c.id)} className="p-2 text-muted-foreground hover:text-destructive transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
