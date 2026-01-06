import { useState, useRef, ChangeEvent } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";
import {
  Upload as UploadIcon,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
  Database,
  BarChart3,
  FileText,
  X,
} from "lucide-react";
import { toast } from "sonner";

interface UploadedData {
  records: number;
  months: number;
  trends: number;
  fileName: string;
}

interface HistoricalTrend {
  period: string;
  avgOccupancy: number;
  avgRevenue: number;
}

const Upload = () => {
  const { currency } = useCurrency();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadedData, setUploadedData] = useState<UploadedData | null>(null);
  const [historicalTrends, setHistoricalTrends] = useState<HistoricalTrend[]>([
    { period: "Q1 2024", avgOccupancy: 72, avgRevenue: 365000 },
    { period: "Q2 2024", avgOccupancy: 78, avgRevenue: 395000 },
    { period: "Q3 2024", avgOccupancy: 82, avgRevenue: 420000 },
    { period: "Q4 2024", avgOccupancy: 85, avgRevenue: 445000 },
  ]);

  const handleFileSelect = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "text/csv",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/json",
    ];

    if (!validTypes.includes(file.type) && !file.name.match(/\.(csv|xlsx|xls|json)$/i)) {
      toast.error("Invalid file type", {
        description: "Please upload a CSV, XLSX, or JSON file",
      });
      return;
    }

    setIsUploading(true);

    // Simulate file upload
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsUploading(false);
    setIsAnalyzing(true);

    toast.info("Processing data...", {
      description: "AI is analyzing your booking data",
    });

    // Simulate AI analysis
    await new Promise((resolve) => setTimeout(resolve, 2500));

    // Generate random but reasonable analysis results
    const records = Math.floor(Math.random() * 8000) + 2000;
    const months = Math.floor(Math.random() * 18) + 6;
    const trends = Math.floor(Math.random() * 6) + 2;

    // Generate new historical trends based on "analysis"
    const newTrends: HistoricalTrend[] = [
      { period: "Q1 2024", avgOccupancy: 68 + Math.floor(Math.random() * 15), avgRevenue: 320000 + Math.floor(Math.random() * 100000) },
      { period: "Q2 2024", avgOccupancy: 72 + Math.floor(Math.random() * 15), avgRevenue: 350000 + Math.floor(Math.random() * 100000) },
      { period: "Q3 2024", avgOccupancy: 76 + Math.floor(Math.random() * 15), avgRevenue: 380000 + Math.floor(Math.random() * 100000) },
      { period: "Q4 2024", avgOccupancy: 80 + Math.floor(Math.random() * 15), avgRevenue: 410000 + Math.floor(Math.random() * 100000) },
    ];

    setHistoricalTrends(newTrends);
    setUploadedData({
      records,
      months,
      trends,
      fileName: file.name,
    });
    setIsAnalyzing(false);

    toast.success("Analysis complete!", {
      description: `${records.toLocaleString()} records analyzed from ${file.name}`,
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleReset = () => {
    setUploadedData(null);
    setHistoricalTrends([
      { period: "Q1 2024", avgOccupancy: 72, avgRevenue: 365000 },
      { period: "Q2 2024", avgOccupancy: 78, avgRevenue: 395000 },
      { period: "Q3 2024", avgOccupancy: 82, avgRevenue: 420000 },
      { period: "Q4 2024", avgOccupancy: 85, avgRevenue: 445000 },
    ]);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls,.json"
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Data Upload</h1>
          <p className="mt-1 text-muted-foreground">
            Upload your hotel booking data for AI-powered trend analysis
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Section */}
          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="text-lg">Upload Booking Data</CardTitle>
            </CardHeader>
            <CardContent>
              {!uploadedData ? (
                <div className="space-y-6">
                  {/* Drop Zone */}
                  <div
                    className={`relative flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300 ${
                      isUploading || isAnalyzing
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                    onClick={handleUploadClick}
                  >
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-10 w-10 animate-spin rounded-full border-3 border-primary/30 border-t-primary" />
                        <p className="text-sm text-muted-foreground">
                          Uploading file...
                        </p>
                      </div>
                    ) : isAnalyzing ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          <BarChart3 className="h-10 w-10 text-primary animate-pulse" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          AI analyzing data...
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                          <UploadIcon className="h-7 w-7 text-primary" />
                        </div>
                        <p className="mt-4 text-sm font-medium text-foreground">
                          Click to upload your data file
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          CSV, XLSX, or JSON files supported
                        </p>
                      </>
                    )}
                  </div>

                  {/* File Format Info */}
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-start gap-3">
                      <FileSpreadsheet className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Supported Formats
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Upload your hotel booking data in CSV, Excel (.xlsx), or JSON format. 
                          The system will automatically detect and parse your data structure.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex flex-col items-center py-6">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                    <p className="mt-4 text-lg font-medium text-foreground">
                      Upload Complete
                    </p>
                    <div className="mt-2 flex items-center gap-2 rounded-lg bg-secondary/50 px-3 py-1.5">
                      <FileText className="h-4 w-4 text-primary" />
                      <p className="text-sm text-muted-foreground">
                        {uploadedData.fileName}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <Database className="mx-auto h-5 w-5 text-primary" />
                      <p className="mt-2 text-lg font-bold text-foreground">
                        {uploadedData.records.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">Records</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <BarChart3 className="mx-auto h-5 w-5 text-primary" />
                      <p className="mt-2 text-lg font-bold text-foreground">
                        {uploadedData.months}
                      </p>
                      <p className="text-xs text-muted-foreground">Months</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <TrendingUp className="mx-auto h-5 w-5 text-primary" />
                      <p className="mt-2 text-lg font-bold text-foreground">
                        {uploadedData.trends}
                      </p>
                      <p className="text-xs text-muted-foreground">Trends</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleReset}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Upload New Data
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Historical Trends */}
          <Card className="animate-slide-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="text-lg">Historical Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {historicalTrends.map((trend, index) => (
                  <div
                    key={trend.period}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 p-4 transition-all duration-200 hover:bg-secondary"
                    style={{ animationDelay: `${(index + 3) * 100}ms` }}
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {trend.period}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Avg Occupancy: {trend.avgOccupancy}%
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-primary">
                        {currency.symbol}{(trend.avgRevenue / 1000).toFixed(0)}k
                      </p>
                      <p className="text-xs text-muted-foreground">Avg Revenue</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trend Summary */}
              <div className="mt-6 rounded-lg border border-success/30 bg-success/5 p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-success" />
                  <p className="font-medium text-success">Positive Trend</p>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Revenue has grown <span className="text-success font-medium">22%</span>{" "}
                  over the past 4 quarters with consistent occupancy improvements.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Data Requirements */}
        <Card className="animate-slide-up" style={{ animationDelay: "300ms" }}>
          <CardHeader>
            <CardTitle className="text-lg">Data Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { field: "booking_date", desc: "Date of booking" },
                { field: "check_in", desc: "Guest check-in date" },
                { field: "room_type", desc: "Type of room booked" },
                { field: "price", desc: "Room price per night" },
              ].map((item) => (
                <div
                  key={item.field}
                  className="rounded-lg bg-secondary/50 p-3"
                >
                  <code className="text-sm text-primary">{item.field}</code>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Upload;
