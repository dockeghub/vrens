import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Layout, Pointer, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

interface TabContent {
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonHref?: string;
  imageSrc: string;
  imageAlt: string;
}

interface Tab {
  value: string;
  icon: React.ReactNode;
  label: string;
  content: TabContent;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const Feature108 = ({
  badge = "VREN",
  heading = "Engineered for CTR, Not Just Looks",
  description = "There's a version of every video that gets 3% CTR and a version that gets 7%. The difference is almost always the thumbnail.",
  tabs = [
    {
      value: "tab-1",
      icon: <Zap className="h-auto w-4 shrink-0" />,
      label: "CTR-First Design",
      content: {
        badge: "Algorithm Driven",
        title: "Designed to stop the scroll — and earn the click.",
        description:
          "There's a difference between a thumbnail that looks professional and one that performs. Every element — composition, contrast, expression, text placement — is chosen based on what YouTube's algorithm rewards. A 2% CTR improvement on 1M monthly impressions is 20,000 extra views. That compounds every single upload.",
        buttonText: "See the Work",
        buttonHref: "https://www.behance.net/d0cke",
        imageSrc: "https://mir-s3-cdn-cf.behance.net/projects/808/b8579f197498191.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
        imageAlt: "docke Minecraft thumbnail portfolio",
      },
    },
    {
      value: "tab-2",
      icon: <Pointer className="h-auto w-4 shrink-0" />,
      label: "Game-Specific Expertise",
      content: {
        badge: "CS2 · Minecraft · Roblox",
        title: "Three niches. Three years. Zero guessing.",
        description:
          "CS2 converts on dramatic angles, clutch-moment framing, and competitive intensity. Minecraft needs iconic builds and clean three-element composition. Roblox performs with neon contrast and dynamic character action. These aren't the same thumbnail in a different color — each game has its own visual language, and I've spent three years learning every one.",
        buttonText: "Order Now",
        buttonHref: "https://discord.gg/vren",
        imageSrc: "https://mir-s3-cdn-cf.behance.net/projects/808/90022b193645233.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
        imageAlt: "docke CS2 thumbnail portfolio",
      },
    },
    {
      value: "tab-3",
      icon: <Layout className="h-auto w-4 shrink-0" />,
      label: "24-Hour Delivery",
      content: {
        badge: "Same-Day Turnaround",
        title: "Published the same day your video is ready.",
        description:
          "YouTube's algorithm rewards consistency above almost everything else. Waiting 3–5 days for a thumbnail means delaying your upload and losing the critical first-24-hour view velocity window — the period that determines how widely your video gets pushed. Every order delivers within 24 hours so your video never sits waiting.",
        buttonText: "Get Started",
        buttonHref: "https://discord.gg/vren",
        imageSrc: "https://mir-s3-cdn-cf.behance.net/projects/808/f39cf2193645039.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png",
        imageAlt: "docke Minecraft thumbnail portfolio",
      },
    },
  ],
}: Feature108Props) => {
  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
            {heading}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary cursor-pointer"
              >
                {tab.icon} {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-muted/70 p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="grid place-items-center gap-20 lg:grid-cols-2 lg:gap-10"
              >
                <div className="flex flex-col gap-5">
                  <Badge variant="outline" className="w-fit bg-background">
                    {tab.content.badge}
                  </Badge>
                  <h3 className="text-3xl font-semibold lg:text-5xl">
                    {tab.content.title}
                  </h3>
                  <p className="text-muted-foreground lg:text-lg">
                    {tab.content.description}
                  </p>
                  <Button className="mt-2.5 w-fit gap-2" size="lg" asChild={!!tab.content.buttonHref}>
                    {tab.content.buttonHref ? (
                      <Link href={tab.content.buttonHref} target="_blank" rel="noopener noreferrer">
                        {tab.content.buttonText}
                      </Link>
                    ) : tab.content.buttonText}
                  </Button>
                </div>
                <img
                  src={tab.content.imageSrc}
                  alt={tab.content.imageAlt}
                  className="rounded-xl w-full object-cover max-h-80"
                />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { Feature108 };
