import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { toast } from 'sonner';
import { Sparkles, TrendingUp, MessageCircle, Volume2, Settings } from 'lucide-react';

interface AnalyzeVoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string;
  accountName: string;
  platform: string;
}

export function AnalyzeVoiceModal({ isOpen, onClose, accountId, accountName, platform }: AnalyzeVoiceModalProps) {
  const [analyzing, setAnalyzing] = useState(true);
  const [voiceAnalysis, setVoiceAnalysis] = useState<any>(null);
  const [voiceSettings, setVoiceSettings] = useState({
    tone: 'professional',
    formality: 0.7,
    enthusiasm: 0.6,
    creativity: 0.5,
    voice: 'nova',
    language: 'en-US',
  });

  useEffect(() => {
    if (isOpen) {
      // Simulate analysis
      setAnalyzing(true);
      setTimeout(() => {
        setVoiceAnalysis({
          traits: ['Professional', 'Approachable', 'Informative', 'Authentic'],
          tone: 'Professional yet friendly',
          avgSentiment: 0.72,
          topicsFocus: ['Sales', 'Marketing', 'Customer Success'],
          engagement: {
            avgLikes: 156,
            avgComments: 23,
            avgShares: 12,
          },
          recommendations: [
            'Increase storytelling elements for higher engagement',
            'Consider more personal anecdotes to build connection',
            'Maintain professional tone while adding warmth',
          ],
        });
        setAnalyzing(false);
        toast.success('Voice analysis complete!');
      }, 2000);
    }
  }, [isOpen]);

  const handleSaveSettings = () => {
    toast.success('Voice settings saved!');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            AI Brand Voice Analysis & Settings
          </DialogTitle>
          <DialogDescription>
            Analyzing {accountName}'s voice on {platform}
          </DialogDescription>
        </DialogHeader>

        {analyzing ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Analyzing your posts and brand voice...</p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mt-2">This may take a few moments</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Voice Analysis Results */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Brand Voice Analysis
              </h3>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Personality Traits</CardTitle>
                  <CardDescription>Identified from your recent posts</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {voiceAnalysis?.traits.map((trait: string) => (
                      <Badge key={trait} variant="secondary" className="text-sm">
                        {trait}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-sm">
                      <strong>Overall Tone:</strong> {voiceAnalysis?.tone}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Engagement Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Avg. Likes:</span>
                      <span>{voiceAnalysis?.engagement.avgLikes}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Avg. Comments:</span>
                      <span>{voiceAnalysis?.engagement.avgComments}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Avg. Shares:</span>
                      <span>{voiceAnalysis?.engagement.avgShares}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Content Focus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {voiceAnalysis?.topicsFocus.map((topic: string) => (
                        <Badge key={topic} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI Recommendations</CardTitle>
                  <CardDescription>Ways to improve engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {voiceAnalysis?.recommendations.map((rec: string, idx: number) => (
                      <li key={idx} className="text-sm flex items-start gap-2">
                        <Sparkles className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            <Separator />

            {/* Voice Settings */}
            <div className="space-y-4">
              <h3 className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Voice Generation Settings
              </h3>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">AI Generation Parameters</CardTitle>
                  <CardDescription>
                    Configure how AI generates content for this account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tone">Content Tone</Label>
                      <Select
                        value={voiceSettings.tone}
                        onValueChange={(value) => setVoiceSettings({ ...voiceSettings, tone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="professional">Professional</SelectItem>
                          <SelectItem value="casual">Casual</SelectItem>
                          <SelectItem value="friendly">Friendly</SelectItem>
                          <SelectItem value="authoritative">Authoritative</SelectItem>
                          <SelectItem value="conversational">Conversational</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="voice">Voice Model</Label>
                      <Select
                        value={voiceSettings.voice}
                        onValueChange={(value) => setVoiceSettings({ ...voiceSettings, voice: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="gpt-4">GPT-4 (Balanced)</SelectItem>
                          <SelectItem value="gpt-4-turbo">GPT-4 Turbo (Fast)</SelectItem>
                          <SelectItem value="claude-3">Claude 3 (Creative)</SelectItem>
                          <SelectItem value="claude-3.7-sonnet">Claude 3.7 Sonnet (Advanced)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Formality: {voiceSettings.formality.toFixed(1)}</Label>
                      <span className="text-xs text-slate-500">Casual ← → Formal</span>
                    </div>
                    <Slider
                      value={[voiceSettings.formality]}
                      onValueChange={([value]) => setVoiceSettings({ ...voiceSettings, formality: value })}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Enthusiasm: {voiceSettings.enthusiasm.toFixed(1)}</Label>
                      <span className="text-xs text-slate-500">Reserved ← → Enthusiastic</span>
                    </div>
                    <Slider
                      value={[voiceSettings.enthusiasm]}
                      onValueChange={([value]) => setVoiceSettings({ ...voiceSettings, enthusiasm: value })}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Creativity: {voiceSettings.creativity.toFixed(1)}</Label>
                      <span className="text-xs text-slate-500">Factual ← → Creative</span>
                    </div>
                    <Slider
                      value={[voiceSettings.creativity]}
                      onValueChange={([value]) => setVoiceSettings({ ...voiceSettings, creativity: value })}
                      min={0}
                      max={1}
                      step={0.1}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {!analyzing && (
            <Button onClick={handleSaveSettings}>
              <Settings className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
