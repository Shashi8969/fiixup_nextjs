import Link from "next/link";
import { CmsImage } from "@/components/ui/CmsImage";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { TeamMember } from "@/lib/team";

type Props = {
  members: TeamMember[];
};

export function TeamSection({ members }: Props) {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto max-w-5xl px-4 text-center">
        <SectionHeader heading="Our Team" />

        {members.length > 0 ? (
          <>
            <p className="mx-auto mb-12 max-w-2xl text-lg text-gray-700">
              Fiixup is powered by certified technicians, support staff, and auto care experts — each carefully selected and passionate about exceptional service.
            </p>
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {members.map((member) => (
                <div key={member.id} className="group text-left">
                  {member.photoUrl ? (
                    <CmsImage
                      src={member.photoUrl}
                      alt={member.name}
                      ratio="square"
                      fit="cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                      className="mb-4 shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl"
                    />
                  ) : (
                    <div className="mb-4 flex aspect-square items-center justify-center rounded-2xl bg-blue-600 shadow-md transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-xl">
                      <span className="text-3xl font-bold text-white">
                        {member.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}
                      </span>
                    </div>
                  )}
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  {member.role && <p className="text-sm font-medium text-blue-600">{member.role}</p>}
                  {member.bio && <p className="mt-1.5 text-sm text-gray-500 leading-relaxed line-clamp-3">{member.bio}</p>}
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="mb-12 text-lg text-gray-700">
            Fiixup is powered by 50+ certified technicians, support staff, and auto care experts — each carefully selected and passionate about exceptional service.
          </p>
        )}

        <div className="mt-14 rounded-xl bg-blue-50 p-8">
          <p className="mb-4 text-xl font-semibold text-gray-900">Join Our Team</p>
          <p className="mb-6 text-gray-700">We&apos;re always looking for skilled technicians who share our commitment to quality.</p>
          <Link
            href="/contact"
            className="inline-block rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            View Career Opportunities
          </Link>
        </div>
      </div>
    </section>
  );
}
