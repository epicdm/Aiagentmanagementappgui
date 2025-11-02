import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { TestTube2, Phone } from "lucide-react";

interface TestingPageProps {
  accessToken: string;
}

export function TestingPage({ accessToken }: TestingPageProps) {
  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl mb-2">Agent Testing</h1>
        <p className="text-slate-600">Test your agents before going live</p>
      </div>

      {/* Test Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Test Configuration</CardTitle>
          <CardDescription>
            Configure and run a test call with your AI agent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="test-agent">Select Agent</Label>
            <Select>
              <SelectTrigger id="test-agent">
                <SelectValue placeholder="Choose an agent to test" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Sales Bot</SelectItem>
                <SelectItem value="2">Support Agent</SelectItem>
                <SelectItem value="3">Lead Generator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Test Type</Label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="test-type" value="inbound" defaultChecked />
                <span>Inbound Call (Agent receives)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="test-type" value="outbound" />
                <span>Outbound Call (Agent makes)</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="test-phone">Your Phone Number</Label>
            <Input
              id="test-phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <Button className="w-full" size="lg">
            <Phone className="h-5 w-5 mr-2" />
            Start Test Call
          </Button>
        </CardContent>
      </Card>

      {/* Coming Soon */}
      <Card>
        <CardContent className="p-12 text-center">
          <TestTube2 className="h-16 w-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-2xl mb-2">Live Call Monitor</h3>
          <p className="text-slate-600">
            Real-time call monitoring with transcripts will appear here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
