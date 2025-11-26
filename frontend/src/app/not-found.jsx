"use client";

import { Home, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "~/styles/components/ui/button";

function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background flex items-center justify-center px-4 py-12 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="w-full max-w-3xl relative z-10">
        <div className="text-center space-y-8">
          {/* Large 404 Display */}
          <div className="space-y-4">
            <div className="relative inline-block">
              <div className="text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary/80 select-none">
                404
              </div>
              <div className="absolute inset-0 text-8xl md:text-9xl font-black text-primary/20 blur-xl -z-10">404</div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-4 max-w-xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Page Not Found</h1>
            <p className="text-lg text-muted-foreground text-balance">
              Oops! It looks like you&apos;ve wandered into the digital void. The page you&apos;re searching for
              doesn&apos;t exist or has been moved somewhere else.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="w-5 h-5" />
                Back to Home
              </Link>
            </Button>

            <Button onClick={() => router.back()} variant="outline" size="lg" className="gap-2">
              <RotateCcw className="w-5 h-5" />
              Go Back
            </Button>
          </div>

          {/* Help Text */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Need help?{" "}
              <Link href="/" className="text-primary hover:text-accent transition-colors font-medium">
                Visit our homepage
              </Link>{" "}
              or try searching for what you need.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
