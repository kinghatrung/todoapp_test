import { ArrowRight, Zap, BarChart3, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "~/styles/components/ui/button";
import { Card } from "~/styles/components/ui/card";
import Header from "~/components/Header";
import Footer from "~/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight text-balance">
              Manage your work, <span className="text-primary">stay focused</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              Simple, powerful task management to organize your workflow and boost productivity.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button asChild className="cursor-pointer" size="lg">
                <Link href="/signin">
                  Start Free <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button asChild className="cursor-pointer" size="lg" variant="outline">
                <Link href="/signin">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="bg-accent-foreground rounded-2xl p-8 min-h-96 flex items-center justify-center">
            <div className="text-center">
              <Image width={400} height={400} alt="Image" src="/icons/undraw_manage-chats_7wl6.svg" />
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="bg-muted/30 border-y border-border py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Why choose TaskFlow?</h2>
            <p className="text-xl text-muted-foreground">Everything you need to manage tasks efficiently</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="p-8">
              <Zap className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Lightning Fast</h3>
              <p className="text-muted-foreground">Create and manage tasks instantly with our optimized interface</p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8">
              <BarChart3 className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Track Progress</h3>
              <p className="text-muted-foreground">Monitor your productivity with detailed statistics and insights</p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8">
              <Lock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Secure & Private</h3>
              <p className="text-muted-foreground">
                Your data is encrypted and protected with enterprise-grade security
              </p>
            </Card>
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <Card className="bg-primary text-primary-foreground p-12 md:p-16 text-center border-0">
          <h2 className="text-4xl font-bold mb-4 text-balance">Ready to boost your productivity?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of users who are already organizing their work with TaskFlow
          </p>
          <Button asChild className="cursor-pointer" variant="secondary" size="lg">
            <Link href="/signin">Get Started Free</Link>
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  );
}
