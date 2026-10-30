
import { useState } from "react";
import {
  Code2,
  MessageSquare,
  Map,
  ChevronDown,
  ChevronUp,
  CircleCheck,
} from "lucide-react";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function Interview() {
  const [activeSection, setActiveSection] = useState("technical");
  const [expandedQuestion, setExpandedQuestion] = useState(0);
  const {report,getReportbyId,loading} = useInterview();
  const {interviewId} = useParams();

  useEffect(()=>{
    const getReport = async ()=>{
      await getReportbyId(interviewId);
    }
    getReport();
  },[interviewId])




  const sections = [
    { id: "technical", label: "Technical Questions", icon: Code2 },
    { id: "behavioral", label: "Behavioral Questions", icon: MessageSquare },
    { id: "roadmap", label: "Road Map", icon: Map },
  ];

  // Supports both your existing report property names and corrected names.
  const technicalQuestions = report?.technicalQuestion ?? [];
  const behavioralQuestions = report?.behavioralQuestion ?? [];
  const skillGaps = report?.skillGaps ?? report?.skillGap ?? [];
  const preparationPlan =
    report?.preparationPlan ??
    report?.preprationPlanSchema ??
    report?.preprationPlan ??
    [];

  const questions =
    activeSection === "technical"
      ? technicalQuestions
      : behavioralQuestions;

  const matchScore = report?.matchScore ?? 0;

  const getSeverityClass = (severity) => {
    switch (severity) {
      case "high":
        return "border-red-500/20 bg-red-500/10 text-red-400";
      case "medium":
        return "border-amber-500/20 bg-amber-500/10 text-amber-400";
      default:
        return "border-emerald-500/20 bg-emerald-500/10 text-emerald-400";
    }
  };

  if(loading || !report){
    return(
      <main className="min-h-screen bg-[#151b24] text-gray-100">
        <h1>Loading your report</h1>
        </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#151b24] text-gray-100">
      <div className="grid min-h-screen grid-cols-1 md:grid-cols-[235px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_340px]">

        {/* LEFT SIDEBAR */}
        <aside className="border-b border-white/10 p-5 md:border-r md:border-b-0">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-500">
            Sections
          </p>

          <nav className="flex gap-2 overflow-x-auto md:flex-col">
            {sections.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveSection(id);
                  setExpandedQuestion(0);
                }}
                className={`flex shrink-0 items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium transition ${
                  activeSection === id
                    ? "bg-pink-500/15 text-pink-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={19} />
                {label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 p-5 sm:p-7">
          {activeSection !== "roadmap" ? (
            <>
              <div className="mb-7 flex flex-wrap items-center gap-3 border-b border-white/10 pb-5">
                <h1 className="text-xl font-bold sm:text-2xl">
                  {activeSection === "technical"
                    ? "Technical Questions"
                    : "Behavioral Questions"}
                </h1>

                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-gray-400">
                  {questions.length} questions
                </span>
              </div>

              <div className="space-y-4">
                {questions.map((item, index) => {
                  const isExpanded = expandedQuestion === index;

                  return (
                    <article
                      key={`${activeSection}-${index}`}
                      className={`overflow-hidden rounded-xl border transition ${
                        isExpanded
                          ? "border-indigo-400/30 bg-[#202638]"
                          : "border-white/5 bg-[#1d2434] hover:border-white/10"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedQuestion(isExpanded ? -1 : index)
                        }
                        aria-expanded={isExpanded}
                        className="flex w-full items-start gap-4 p-4 text-left sm:p-5"
                      >
                        <span className="rounded-md bg-pink-500/15 px-2 py-1 text-sm font-bold text-pink-400">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <span className="flex-1 text-sm font-semibold leading-6 sm:text-base">
                          {item.question}
                        </span>

                        {isExpanded ? (
                          <ChevronUp
                            size={19}
                            className="mt-1 shrink-0 text-pink-400"
                          />
                        ) : (
                          <ChevronDown
                            size={19}
                            className="mt-1 shrink-0 text-gray-500"
                          />
                        )}
                      </button>

                      {isExpanded && (
                        <div className="space-y-5 border-t border-white/5 px-4 pb-5 pt-4 sm:px-5">
                          <div>
                            <span className="mb-2 inline-block rounded-md bg-indigo-400/15 px-2 py-1 text-xs font-bold uppercase tracking-wide text-indigo-300">
                              Intention
                            </span>
                            <p className="text-sm leading-6 text-gray-300">
                              {item.intention}
                            </p>
                          </div>

                          <div>
                            <span className="mb-2 inline-block rounded-md bg-emerald-400/15 px-2 py-1 text-xs font-bold uppercase tracking-wide text-emerald-400">
                              Model Answer
                            </span>
                            <p className="whitespace-pre-line text-sm leading-7 text-gray-300">
                              {item.answer}
                            </p>
                          </div>
                        </div>
                      )}
                    </article>
                  );
                })}

                {questions.length === 0 && (
                  <p className="rounded-xl border border-white/10 p-6 text-sm text-gray-400">
                    No questions available for this section.
                  </p>
                )}
              </div>
            </>
          ) : (
            <div>
              <h1 className="mb-2 text-2xl font-bold">
                Your Preparation Roadmap
              </h1>
              <p className="mb-7 text-sm text-gray-400">
                Follow this plan to prepare for your interview.
              </p>

              <div className="space-y-4">
                {preparationPlan.map((day) => (
                  <article
                    key={day.day}
                    className="rounded-xl border border-white/10 bg-[#1d2434] p-5"
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-pink-400">
                      Day {day.day}
                    </p>
                    <h2 className="mt-2 font-semibold">{day.focus}</h2>

                    <ul className="mt-4 space-y-3">
                      {day.tasks?.map((task, index) => (
                        <li
                          key={index}
                          className="flex gap-3 text-sm leading-6 text-gray-300"
                        >
                          <CircleCheck
                            size={17}
                            className="mt-1 shrink-0 text-emerald-400"
                          />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}

                {preparationPlan.length === 0 && (
                  <p className="text-sm text-gray-400">
                    No preparation roadmap available.
                  </p>
                )}
              </div>
            </div>
          )}
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="border-t border-white/10 p-5 sm:p-7 xl:border-t-0 xl:border-l">
          <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
            Match Score
          </h2>

          <div className="flex flex-col items-center">
            <div
              className="relative flex size-32 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#4ade80 ${matchScore}%, #293342 ${matchScore}% 100%)`,
              }}
            >
              <div className="absolute inset-[5px] flex flex-col items-center justify-center rounded-full bg-[#151b24]">
                <span className="text-4xl font-bold">{matchScore}</span>
                <span className="text-xs text-gray-400">%</span>
              </div>
            </div>

            <p
              className={`mt-4 text-center text-sm font-semibold ${
                matchScore >= 80
                  ? "text-emerald-400"
                  : matchScore >= 60
                    ? "text-amber-400"
                    : "text-red-400"
              }`}
            >
              {matchScore >= 80
                ? "Strong match for this role"
                : matchScore >= 60
                  ? "Moderate match for this role"
                  : "More preparation recommended"}
            </p>
          </div>

          <div className="my-7 border-t border-white/10" />

          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-300">
            Skill Gaps
          </h2>

          <div className="flex flex-col gap-2.5">
            {skillGaps.map((gap, index) => (
              <div
                key={`${gap.skill}-${index}`}
                className={`rounded-lg border px-3 py-2.5 text-sm font-semibold ${getSeverityClass(
                  gap.severity
                )}`}
              >
                {gap.skill}
              </div>
            ))}

            {skillGaps.length === 0 && (
              <p className="text-sm text-gray-500">
                No skill gaps available.
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}

export default Interview;
