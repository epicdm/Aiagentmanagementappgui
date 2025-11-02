import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { CreditCard, Download, TrendingUp, TrendingDown, DollarSign, Loader2 } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface Invoice {
  id: string;
  date: string;
  amount: number;
  status: 'paid' | 'pending' | 'failed';
  period: string;
}

interface BillingPageProps {
  accessToken: string;
}

export function BillingPage({ accessToken }: BillingPageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    loadBillingData();
  }, []);

  const loadBillingData = async () => {
    try {
      setIsLoading(true);
      // Mock data
      setInvoices([
        { id: "INV-001", date: "2025-10-01", amount: 234.56, status: "paid", period: "Oct 2025" },
        { id: "INV-002", date: "2025-09-01", amount: 198.32, status: "paid", period: "Sep 2025" },
        { id: "INV-003", date: "2025-08-01", amount: 276.89, status: "paid", period: "Aug 2025" },
        { id: "INV-004", date: "2025-07-01", amount: 312.45, status: "paid", period: "Jul 2025" },
      ]);
    } catch (error) {
      console.error('Error loading billing data:', error);
      toast.error("Failed to load billing data");
    } finally {
      setIsLoading(false);
    }
  };

  const currentMonth = {
    calls: 1247,
    minutes: 2456,
    cost: 234.56,
    trend: { value: "+12%", isPositive: true }
  };

  const costBreakdown = [
    { name: "STT", value: 45.60, percentage: 19, color: "#3B82F6" },
    { name: "LLM", value: 98.34, percentage: 42, color: "#8B5CF6" },
    { name: "TTS", value: 52.12, percentage: 22, color: "#10B981" },
    { name: "Telecom", value: 38.50, percentage: 17, color: "#F59E0B" },
  ];

  const dailyCosts = [
    { date: "Oct 24", cost: 8.5 },
    { date: "Oct 25", cost: 12.3 },
    { date: "Oct 26", cost: 9.8 },
    { date: "Oct 27", cost: 15.6 },
    { date: "Oct 28", cost: 11.2 },
    { date: "Oct 29", cost: 14.8 },
    { date: "Oct 30", cost: 13.4 },
    { date: "Oct 31", cost: 10.9 },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
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
      <div>
        <h1 className="text-4xl mb-2">Billing & Usage</h1>
        <p className="text-slate-600">Monitor your usage and manage billing</p>
      </div>

      {/* Current Month Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-lg bg-blue-100">
                <DollarSign className="h-5 w-5 text-blue-600" />
              </div>
              <div className={`flex items-center gap-1 text-sm ${
                currentMonth.trend.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {currentMonth.trend.isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                {currentMonth.trend.value}
              </div>
            </div>
            <div className="text-3xl mb-1">${currentMonth.cost.toFixed(2)}</div>
            <div className="text-sm text-slate-600">Current Month Cost</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="p-3 rounded-lg bg-purple-100 mb-4 inline-block">
              <CreditCard className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-3xl mb-1">{currentMonth.calls}</div>
            <div className="text-sm text-slate-600">Total Calls</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="p-3 rounded-lg bg-green-100 mb-4 inline-block">
              <CreditCard className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl mb-1">{Math.floor(currentMonth.minutes / 60)}h {currentMonth.minutes % 60}m</div>
            <div className="text-sm text-slate-600">Total Minutes</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="p-3 rounded-lg bg-orange-100 mb-4 inline-block">
              <DollarSign className="h-5 w-5 text-orange-600" />
            </div>
            <div className="text-3xl mb-1">${(currentMonth.cost / currentMonth.calls).toFixed(2)}</div>
            <div className="text-sm text-slate-600">Avg Cost per Call</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Cost Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Cost Trend</CardTitle>
            <CardDescription>Cost per day over the last week</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={dailyCosts}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value: any) => `$${value.toFixed(2)}`}
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Area type="monotone" dataKey="cost" stroke="#3B82F6" fill="#93C5FD" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Cost Breakdown</CardTitle>
            <CardDescription>Current month by service</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center mb-4">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => `$${value.toFixed(2)}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {costBreakdown.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-500">{item.percentage}%</span>
                    <span className="text-sm">${item.value.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Manage your billing information</CardDescription>
            </div>
            <Button variant="outline">Update Payment</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 border rounded-lg">
            <div className="p-3 bg-slate-100 rounded">
              <CreditCard className="h-6 w-6" />
            </div>
            <div className="flex-1">
              <div>Visa ending in 4242</div>
              <div className="text-sm text-slate-500">Expires 12/2026</div>
            </div>
            <Badge variant="outline">Default</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View and download past invoices</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Period</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{formatDate(invoice.date)}</TableCell>
                  <TableCell>{invoice.period}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(invoice.status)} variant="outline">
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pricing Info */}
      <Card>
        <CardHeader>
          <CardTitle>Current Pricing</CardTitle>
          <CardDescription>Your usage-based pricing breakdown</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Per-minute rate:</span>
            <span>$0.08/minute</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Speech-to-Text:</span>
            <span>$0.006/minute</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">LLM Processing:</span>
            <span>$0.002/1K tokens</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Text-to-Speech:</span>
            <span>$0.015/1K characters</span>
          </div>
          <div className="pt-3 border-t">
            <Button variant="outline" className="w-full">View Detailed Pricing</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
