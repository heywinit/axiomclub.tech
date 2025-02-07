import { PawPrint, Snowflake, Webhook } from "lucide-react";
import { Story, StoryContent } from "@/types/news";

// Speaker configurations
const SPEAKER_CONFIG = {
  W: {
    name: "Vinesh",
    icon: Webhook,
    color: "var(--matrix-color)",
  },
  D: {
    name: "Deep",
    icon: PawPrint,
    color: "#FF6B6B",
  },
  V: {
    name: "Vaidehi",
    icon: Snowflake,
    color: "#4ECDC4",
  },
} as const;

// Helper function to group consecutive content by speaker
function groupContentBySpeaker(content: StoryContent[]): StoryContent[][] {
  return content.reduce((groups: StoryContent[][], current) => {
    const lastGroup = groups[groups.length - 1];

    if (lastGroup && lastGroup[0].speaker === current.speaker) {
      lastGroup.push(current);
    } else {
      groups.push([current]);
    }

    return groups;
  }, []);
}

async function getStory(slug: string): Promise<Story> {
  const response = await fetch(
    `https://raw.githubusercontent.com/axiom-svgu/blogs/refs/heads/main/${slug}.json`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );

  if (!response.ok) {
    throw new Error("Failed to fetch story");
  }

  return response.json();
}

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const story = await getStory(params.slug);
  const groupedContent = groupContentBySpeaker(story.content);

  return (
    <main className="min-h-screen bg-black py-16 px-4">
      <article className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[var(--matrix-color)] to-[var(--matrix-glow)] bg-clip-text text-transparent">
          {story.title}
        </h1>

        {/* Story Content */}
        <div className="space-y-8">
          {groupedContent.map((group, groupIndex) => {
            const speaker = SPEAKER_CONFIG[group[0].speaker];
            const Icon = speaker.icon;

            return (
              <div key={groupIndex} className="group relative">
                {/* Hover effect container */}
                <div
                  className="absolute -inset-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    border: `1px solid ${speaker.color}`,
                    background: `linear-gradient(to right, ${speaker.color}10, transparent)`,
                  }}
                />

                {/* Content */}
                <div className="relative flex items-start gap-4 p-4">
                  {/* Speaker Icon with Tooltip */}
                  <div className="relative group/icon">
                    <Icon
                      className="w-6 h-6 transition-colors duration-300"
                      style={{ color: speaker.color }}
                    />

                    {/* Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 -top-2 transform -translate-y-full opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <div
                        className="px-2 py-1 text-xs rounded-md whitespace-nowrap"
                        style={{
                          backgroundColor: speaker.color,
                          color: "black",
                        }}
                      >
                        {speaker.name}
                      </div>
                      <div
                        className="w-2 h-2 rotate-45 absolute left-1/2 -translate-x-1/2 -bottom-1"
                        style={{ backgroundColor: speaker.color }}
                      />
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 text-gray-300 leading-relaxed space-y-4">
                    {group.map((content, index) => (
                      <p key={index}>{content.text}</p>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </main>
  );
}
