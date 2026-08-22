import { Reveal } from "@/components/ui/Reveal";

export interface TimelineMilestone {
  year: string;
  Icon: React.ComponentType<{ className?: string }>;
  heading: string;
  text: string;
}

export function StoryTimeline({ milestones }: { milestones: TimelineMilestone[] }) {
  return (
    <ol className="relative border-l-2 border-blue-100 pl-8 sm:pl-10">
      {milestones.map(({ year, Icon, heading, text }, i) => (
        <Reveal key={year} delay={Math.min(i, 4) * 0.08} className="relative pb-10 last:pb-0">
          <span className="absolute -left-[2.6rem] flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-md ring-4 ring-white sm:-left-[3.15rem]">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <p className="mb-1 text-sm font-bold uppercase tracking-wider text-blue-600">{year}</p>
          <h3 className="mb-1.5 text-lg font-bold text-gray-900">{heading}</h3>
          <p className="text-gray-600 leading-relaxed">{text}</p>
        </Reveal>
      ))}
    </ol>
  );
}
