import { useState } from 'react';
import { Plus, Search, Trash2, User } from 'lucide-react';
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import Header from "../components/Header"; // Header bileşenini import ettik

type Interview = {
  id: string;
  title: string;
  description: string;
  date: string;
  interviewer: string;
};

export default function InterviewManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false); // Create Dialog kontrolü
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Edit Dialog kontrolü
  const [interviews, setInterviews] = useState<Interview[]>([
    { id: '1', title: 'Tech CEO Interview', description: 'Interview with a prominent tech CEO', date: '2023-06-15', interviewer: 'John Doe' },
    { id: '2', title: 'Startup Founder Chat', description: 'Discussion with a successful startup founder', date: '2023-06-20', interviewer: 'Jane Smith' },
  ]);
  const [newInterview, setNewInterview] = useState<Omit<Interview, 'id'>>({ title: '', description: '', date: '', interviewer: '' });
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  const handleCreateInterview = () => {
    const id = Math.random().toString(36).substr(2, 9);
    setInterviews([...interviews, { ...newInterview, id }]);
    setNewInterview({ title: '', description: '', date: '', interviewer: '' });
    setIsCreateDialogOpen(false); // Create Dialog'ı kapat
  };

  const handleDeleteInterview = (id: string) => {
    setInterviews(interviews.filter(interview => interview.id !== id));
  };

  const handleUpdateInterview = () => {
    if (editingInterview) {
      setInterviews(interviews.map(interview => 
        interview.id === editingInterview.id ? editingInterview : interview
      ));
      setEditingInterview(null);
      setIsEditDialogOpen(false); // Edit Dialog'ı kapat
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-blue-300 text-gray-800">
      {/* Header Bileşeni */}
      <Header />

      <main className="relative px-4 pb-24 pt-32 lg:px-16">
        <h1 className="text-4xl font-bold mb-8">Interview Management</h1>

        <Button className="mb-6" onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Create New Interview
        </Button>

        {/* Create Interview Dialog */}
        {isCreateDialogOpen && (
          <Dialog>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Interview</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Title</Label>
                  <Input id="title" className="col-span-3" value={newInterview.title} onChange={(e) => setNewInterview({...newInterview, title: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                  <Textarea id="description" className="col-span-3" value={newInterview.description} onChange={(e) => setNewInterview({...newInterview, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Date</Label>
                  <Input id="date" type="date" className="col-span-3" value={newInterview.date} onChange={(e) => setNewInterview({...newInterview, date: e.target.value})} />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="interviewer" className="text-right">Interviewer</Label>
                  <Input id="interviewer" className="col-span-3" value={newInterview.interviewer} onChange={(e) => setNewInterview({...newInterview, interviewer: e.target.value})} />
                </div>
              </div>
              <Button onClick={handleCreateInterview}>Create Interview</Button>
            </DialogContent>
          </Dialog>
        )}

        <div className="space-y-6">
          {interviews.map((interview) => (
            <div key={interview.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-2">{interview.title}</h2>
              <p className="text-gray-600 mb-4">{interview.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p><strong>Date:</strong> {interview.date}</p>
                  <p><strong>Interviewer:</strong> {interview.interviewer}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => { setEditingInterview(interview); setIsEditDialogOpen(true); }}>Edit</Button>

                  {/* Edit Interview Dialog */}
                  {isEditDialogOpen && (
                    <Dialog>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Interview</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-title" className="text-right">Title</Label>
                            <Input id="edit-title" className="col-span-3" value={editingInterview?.title || ''} onChange={(e) => setEditingInterview({...editingInterview!, title: e.target.value})} />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-description" className="text-right">Description</Label>
                            <Textarea id="edit-description" className="col-span-3" value={editingInterview?.description || ''} onChange={(e) => setEditingInterview({...editingInterview!, description: e.target.value})} />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-date" className="text-right">Date</Label>
                            <Input id="edit-date" type="date" className="col-span-3" value={editingInterview?.date || ''} onChange={(e) => setEditingInterview({...editingInterview!, date: e.target.value})} />
                          </div>
                          <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="edit-interviewer" className="text-right">Interviewer</Label>
                            <Input id="edit-interviewer" className="col-span-3" value={editingInterview?.interviewer || ''} onChange={(e) => setEditingInterview({...editingInterview!, interviewer: e.target.value})} />
                          </div>
                        </div>
                        <Button onClick={handleUpdateInterview}>Update Interview</Button>
                      </DialogContent>
                    </Dialog>
                  )}
                  <Button variant="destructive" onClick={() => handleDeleteInterview(interview.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
