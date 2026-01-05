import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { historicalTrends } from "@/lib/mockData";
import {
  Upload as UploadIcon,
  FileSpreadsheet,
  CheckCircle2,
  TrendingUp,
  Database,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

const Upload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileUpload = async () => {
    setIsUploading(true);

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsUploading(false);
    setIsAnalyzing(true);

    toast.info("Processing data...", {
      description: "AI is analyzing your booking data",
    });

    // Simulate analysis
    await new Promise((resolve) => setTimeout(resolve, 2500));
    setIsAnalyzing(false);
    setUploadComplete(true);

    toast.success("Analysis complete!", {
      description: "Historical trends have been identified",
    });
  };

  const handleReset = () => {
    setUploadComplete(false);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground">Data Upload</h1>
          <p className="mt-1 text-muted-foreground">
            Upload historical booking data for AI-powered trend analysis
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Upload Section */}
          <Card className="animate-slide-up" style={{ animationDelay: "100ms" }}>
            <CardHeader>
              <CardTitle className="text-lg">Upload Booking Data</CardTitle>
            </CardHeader>
            <CardContent>
              {!uploadComplete ? (
                <div className="space-y-6">
                  {/* Drop Zone */}
                  <div
                    className={`relative flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-all duration-300 ${
                      isUploading || isAnalyzing
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-secondary/50"
                    }`}
                    onClick={handleFileUpload}
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
                          Click to upload or drag and drop
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          CSV, XLSX, or JSON files supported
                        </p>
                      </>
                    )}
                  </div>

                  {/* Sample Data Info */}
                  <div className="rounded-lg bg-secondary/50 p-4">
                    <div className="flex items-start gap-3">
                      <FileSpreadsheet className="mt-0.5 h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Sample Data Available
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          For demo purposes, click the upload area to simulate
                          processing hotel_bookings_2024.csv (5,420 records)
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
                    <p className="mt-1 text-sm text-muted-foreground">
                      5,420 booking records analyzed
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <Database className="mx-auto h-5 w-5 text-primary" />
                      <p className="mt-2 text-lg font-bold text-foreground">
                        5,420
                      </p>
                      <p className="text-xs text-muted-foreground">Records</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <BarChart3 className="mx-auto h-5 w-5 text-primary" />
                      <p className="mt-2 text-lg font-bold text-foreground">
                        12
                      </p>
                      <p className="text-xs text-muted-foreground">Months</p>
                    </div>
                    <div className="rounded-lg bg-secondary/50 p-3 text-center">
                      <TrendingUp className="mx-auto h-5 w-5 text-primary" />
                      <p className="mt-2 text-lg font-bold text-foreground">
                        4
                      </p>
                      <p className="text-xs text-muted-foreground">Trends</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleReset}
                  >
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
                        ${(trend.avgRevenue / 1000).toFixed(0)}k
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
