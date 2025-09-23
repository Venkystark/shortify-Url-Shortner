import { Zap, Shield, BarChart3, Link, Globe, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Shorten URLs in milliseconds with our optimized platform"
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Your links are protected with enterprise-grade security"
  },
  {
    icon: BarChart3,
    title: "Detailed Analytics",
    description: "Track clicks, locations, and engagement metrics"
  },
  {
    icon: Link,
    title: "Custom Short Links",
    description: "Create branded short links that match your style"
  },
  {
    icon: Globe,
    title: "Global CDN",
    description: "Fast redirects worldwide with our global infrastructure"
  },
  {
    icon: Clock,
    title: "Link Management",
    description: "Edit, disable, or delete your links anytime"
  }
];

export function Features() {
  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl">Why Choose Shortify?</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          We provide the tools and features you need to manage your links effectively
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}