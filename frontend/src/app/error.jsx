"use client";
import { AlertCircle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";

import { Button } from "~/styles/components/ui/button";

function Error() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="text-center space-y-8">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl" />
              <div className="relative bg-destructive/10 p-6 rounded-full w-24 h-24 flex items-center justify-center">
                <AlertCircle className="w-12 h-12 text-destructive" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-balance text-foreground">Oops! Có gì đó không ổn</h1>
            <p className="text-xl text-muted-foreground max-w-md mx-auto text-balance">
              Rất tiếc, có sự cố ngoài ý muốn đã xảy ra. Vui lòng thử lại hoặc quay lại trang chủ.
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-card border border-border rounded-lg p-6 text-left max-w-md mx-auto">
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Error Code</p>
                <p className="text-lg font-mono text-foreground">500</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Trạng thái</p>
                <p className="text-foreground">Lỗi máy chủ nội bộ</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Thời gian</p>
                <p className="text-foreground text-sm">{new Date().toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={() => window.location.reload()}
              className="inline-flex cursor-pointer items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground hover:opacity-90 transition-opacity rounded-lg font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Thử lại
            </Button>
            <Button asChild variant="outline">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground hover:opacity-90 transition-opacity rounded-lg font-medium"
              >
                <Home className="w-4 h-4" />
                Trở về trang chủ
              </Link>
            </Button>
          </div>

          {/* Footer Message */}
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Nếu vấn đề này vẫn tiếp diễn, vui lòng{" "}
              <a href="mailto:support@example.com" className="text-primary hover:underline font-medium">
                liên hệ đến đội ngũ hỗ trợ
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Error;
