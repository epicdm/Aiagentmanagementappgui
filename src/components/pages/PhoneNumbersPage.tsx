import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Phone, Plus, Loader2, Settings } from "lucide-react";
import { PhoneNumber, getPhoneNumbers, assignPhoneNumber, Agent, getAgents } from "../../utils/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { toast } from "sonner@2.0.3";

interface PhoneNumbersPageProps {
  accessToken: string;
}

export function PhoneNumbersPage({ accessToken }: PhoneNumbersPageProps) {
  const [phoneNumbers, setPhoneNumbers] = useState<PhoneNumber[]>([]);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhone, setSelectedPhone] = useState<PhoneNumber | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState<string>("__unassigned__");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [phonesData, agentsData] = await Promise.all([
        getPhoneNumbers(accessToken),
        getAgents(accessToken)
      ]);
      // Filter out null values
      const validPhones = (phonesData || []).filter(phone => phone != null);
      const validAgents = (agentsData || []).filter(agent => agent != null && agent.id);
      setPhoneNumbers(validPhones);
      setAgents(validAgents);
    } catch (error) {
      console.error('Error loading data:', error);
      toast.error("Failed to load phone numbers");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAssignClick = (phone: PhoneNumber) => {
    setSelectedPhone(phone);
    setSelectedAgentId(phone.assignedAgentId || "__unassigned__");
    setIsAssignDialogOpen(true);
  };

  const handleAssign = async () => {
    if (!selectedPhone) return;

    try {
      const agentId = selectedAgentId === "__unassigned__" ? null : selectedAgentId;
      const updatedPhone = await assignPhoneNumber(
        accessToken, 
        selectedPhone.id, 
        agentId
      );
      
      setPhoneNumbers(phoneNumbers.map(p => 
        p.id === updatedPhone.id ? updatedPhone : p
      ));
      
      setIsAssignDialogOpen(false);
      toast.success(agentId ? "Phone number assigned!" : "Phone number unassigned!");
    } catch (error) {
      console.error('Error assigning phone:', error);
      toast.error("Failed to assign phone number");
    }
  };

  const totalPhones = phoneNumbers.length;
  const assignedPhones = phoneNumbers.filter(p => p.status === 'active').length;
  const availablePhones = totalPhones - assignedPhones;

  const getAgentName = (agentId?: string) => {
    if (!agentId) return null;
    const agent = agents.find(a => a.id === agentId);
    return agent?.name || 'Unknown Agent';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full py-20">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-4xl mb-2">Phone Numbers</h1>
          <p className="text-slate-600">Manage your provisioned phone numbers</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Purchase Numbers
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">{totalPhones}</div>
            <div className="text-sm text-slate-600">Total Numbers</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">{assignedPhones}</div>
            <div className="text-sm text-slate-600">Assigned to Agents</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-3xl mb-1">{availablePhones}</div>
            <div className="text-sm text-slate-600">Available for Use</div>
          </CardContent>
        </Card>
      </div>

      {/* Phone Numbers List */}
      <div className="space-y-4">
        {phoneNumbers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Phone className="h-16 w-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-2xl mb-2">No Phone Numbers</h3>
              <p className="text-slate-600 mb-6">
                Purchase phone numbers to start making calls
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Purchase Your First Number
              </Button>
            </CardContent>
          </Card>
        ) : (
          phoneNumbers.map(phone => (
            <Card key={phone.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg ${
                      phone.status === 'active' ? 'bg-green-100' : 'bg-slate-100'
                    }`}>
                      <Phone className={`h-6 w-6 ${
                        phone.status === 'active' ? 'text-green-600' : 'text-slate-400'
                      }`} />
                    </div>
                    <div>
                      <div className="text-xl mb-1">{phone.formattedNumber}</div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Badge variant={phone.status === 'active' ? 'default' : 'secondary'}>
                          {phone.status}
                        </Badge>
                        {phone.assignedAgentId && getAgentName(phone.assignedAgentId) && (
                          <span>• Assigned to {getAgentName(phone.assignedAgentId)}</span>
                        )}
                        {!phone.assignedAgentId && (
                          <span>• Unassigned</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm text-slate-500">Usage (All Time)</div>
                      <div className="text-sm">
                        {phone.totalCalls} calls • {Math.floor(phone.totalMinutes / 60)}h {phone.totalMinutes % 60}m
                      </div>
                      <div className="text-sm text-slate-500">${phone.totalCost} total</div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleAssignClick(phone)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        {phone.assignedAgentId ? 'Reassign' : 'Assign'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Assign Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedPhone?.assignedAgentId ? 'Reassign' : 'Assign'} Phone Number
            </DialogTitle>
            <DialogDescription>
              {selectedPhone?.formattedNumber}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm">Assign to Agent</label>
              <Select value={selectedAgentId} onValueChange={setSelectedAgentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an agent or leave unassigned" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="__unassigned__">Unassign (No Agent)</SelectItem>
                  {agents.map(agent => (
                    <SelectItem key={agent.id} value={agent.id}>
                      {agent.name} ({agent.type})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAssign}>
              Save Assignment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
