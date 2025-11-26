import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

import { Button } from "~/styles/components/ui/button";

function Header() {
  return (
    <nav className="border-b border-border sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-8 h-8 text-primary" />
          <span className="text-xl font-bold text-foreground">TaskFlow</span>
        </div>
        <div className="flex gap-2">
          <Button asChild className="cursor-pointer" size="sm">
            <Link href="/signin">Sign In</Link>
          </Button>

          <Button asChild className="cursor-pointer" variant="ghost" size="sm">
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
