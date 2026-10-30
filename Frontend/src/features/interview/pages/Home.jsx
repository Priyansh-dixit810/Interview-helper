import { useState } from "react";
import {
  BriefcaseBusiness,
  UserRound,
  Sparkles,
  Info,
  LoaderCircle,
  CheckCircle2,
  FileText,
  X,
  UploadCloud,
} from "lucide-react";
import { useRef } from "react";
import { useInterview } from "../hooks/useInterview";
import { useNavigate } from "react-router-dom";

function Home() {
  const fileInputRef = useRef(null);
  const {loading,generateReport,reports} = useInterview();
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");

  const selectFile = (file) => {
    setError("");
    if (!file) {
      return;
    }
    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      setError("Please upload a PDF resume.");
      return;
    }
    if (file.size > 3 * 1024 * 1024) {
      setError("Your resume must be smaller than 5 MB.");
      return;
    }
    setResume(file);
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await generateReport({jobDescription,selfDescription,resume})
    navigate(`/interview/${response._id}`);
  };
  return (
    <main className="min-h-screen bg-[#090b10] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Create Your Custom{" "}
            <span className="bg-gradient-to-r from-pink-500 to-purple-400 bg-clip-text text-transparent">
              Interview Plan
            </span>
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-400">
            Let our AI analyze the job requirements and your unique profile to
            build a winning strategy.
          </p>
        </header>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-2xl border border-white/10 bg-[#10141c] shadow-2xl shadow-black/30"
        >
          <div className="grid md:grid-cols-2">
            {/* Job Description */}
            <section className="flex flex-col border-b border-white/10 p-5 sm:p-7 md:border-b-0 md:border-r">
              <div className="mb-4 flex items-center justify-between gap-3">
                <label
                  htmlFor="jobDescription"
                  className="flex items-center gap-2 text-sm font-semibold"
                >
                  <BriefcaseBusiness size={17} className="text-pink-500" />
                  Target Job Description
                </label>

                <span className="text-xs font-medium text-pink-400">
                  Required *
                </span>
              </div>

              <textarea
                id="jobDescription"
                name="jobDescription"
                value={jobDescription}
                onChange={(e) =>
                  setJobDescription(e.target.value.slice(0, 5000))
                }
                maxLength={5000}
                required
                placeholder={`Paste the full job description here...
e.g. "Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design."`}
                className="min-h-[300px] w-full flex-1 resize-y rounded-xl border border-white/10 bg-[#202631] p-4 text-sm leading-6 text-gray-200 outline-none transition placeholder:text-gray-500 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/10 md:min-h-[390px]"
              />

              <div className="mt-3 flex justify-end">
                <span className="text-xs text-gray-500">
                  {jobDescription.length}/5000 characters
                </span>
              </div>
            </section>

            {/* Candidate Profile */}
            <section className="flex flex-col gap-6 p-5 sm:p-7">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <UserRound size={18} className="text-pink-500" />
                <h2 className="text-sm font-semibold">Your Profile</h2>
              </div>

              {/* Resume Upload */}
              <div>
                <label className="mb-3 block text-sm font-medium">
                  Upload Resume{" "}
                  <span className="text-pink-400">* PDF, max 3 MB</span>
                </label>

                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  className="hidden"
                  onChange={(e) => selectFile(e.target.files?.[0])}
                  ref={fileInputRef}
                />
              </div>
              {!resume ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    selectFile(e.dataTransfer.files?.[0]);
                  }}
                  className="flex min-h-[150px] w-full flex-col items-center justify-center rounded-xl border border-dashed border-gray-600 bg-[#191f29] px-4 py-6 transition hover:border-pink-500 hover:bg-pink-500/5"
                >
                  <div className="mb-3 rounded-xl bg-pink-500/10 p-3">
                    <UploadCloud size={25} className="text-pink-500" />
                  </div>

                  <span className="text-sm font-semibold">
                    Click to upload or drag & drop
                  </span>

                  <span className="mt-1 text-xs text-gray-500">
                    PDF document (up to 5 MB)
                  </span>
                </button>
              ) : (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                  <FileText size={25} className="shrink-0 text-emerald-400" />

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
                      {resume.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {(resume.size / 1024).toFixed(0)} KB
                    </p>
                  </div>

                  <CheckCircle2
                    size={18}
                    className="shrink-0 text-emerald-400"
                  />

                  <button
                    type="button"
                    aria-label="Remove resume"
                    className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
                    onClick={() => {
                      setResume(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                  >
                    <X size={17} />
                  </button>
                </div>
              )}

              {/* Self Description */}
              <div>
                <label
                  htmlFor="selfDescription"
                  className="mb-3 block text-sm font-semibold"
                >
                  Quick Self-Description{" "}
                  <span className="font-normal text-gray-500">(Optional)</span>
                </label>

                <textarea
                  id="selfDescription"
                  name="selfDescription"
                  value={selfDescription}
                  onChange={(e) =>
                    setSelfDescription(e.target.value.slice(0, 2000))
                  }
                  maxLength={2000}
                  rows={4}
                  placeholder="Briefly describe your experience, key skills, and areas of expertise..."
                  className="w-full resize-y rounded-xl border border-white/10 bg-[#202631] p-4 text-sm leading-6 text-gray-200 outline-none transition placeholder:text-gray-500 focus:border-pink-500/60 focus:ring-2 focus:ring-pink-500/10"
                />

                <div className="mt-2 flex justify-end">
                  <span className="text-xs text-gray-500">
                    {selfDescription.length}/2000 characters
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="flex gap-3 rounded-xl border border-blue-400/15 bg-blue-500/10 p-3">
                <Info size={18} className="mt-0.5 shrink-0 text-blue-400" />
                <p className="text-xs leading-5 text-blue-200/90">
                  Your resume and job description help AI generate relevant
                  interview questions, identify skill gaps, and create a
                  personalized preparation plan.
                </p>
              </div>
            </section>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex flex-col gap-5 border-t border-white/10 bg-[#0e1219] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-xs text-gray-500">
              AI-Powered Strategy Generation
              <span className="mx-2 text-gray-700">•</span>
              Personalized for you
            </p>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-pink-600/20 transition hover:from-pink-500 hover:to-rose-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <LoaderCircle size={18} className="animate-spin" />
                  Analyzing Your Profile...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generate My Interview Strategy
                </>
              )}
            </button>
          </div>
          {error && (
            <div
              role="alert"
              className="border-t border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-300 sm:px-7"
            >
              {error}
            </div>
          )}
        </form>
        {/* Recent Reports */}
        {reports.length > 0 && (
          <section className="mt-10">
            <h2 className="mb-4 text-lg font-semibold">Recent Reports</h2>
            <ul className="divide-y divide-white/10 rounded-xl border border-white/10 bg-[#10141c]">
              {reports.map((report) => (
                <li key={report._id}>
                  <a
                    href={`/interview/${report._id}`}
                    className="flex items-center justify-between gap-3 p-4 transition hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <CheckCircle2
                        size={18}
                        className="shrink-0 text-emerald-400"
                      />
                      <div>
                        <p className="text-sm font-medium">
                          {report.title}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {new Date(report.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-medium text-pink-400">
                      View Report
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Footer */}
        <footer className="mt-8 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
          <a href="/privacy" className="hover:text-pink-400">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-pink-400">
            Terms of Service
          </a>
          <a href="/help" className="hover:text-pink-400">
            Help Center
          </a>
        </footer>
      </div>
    </main>
  );
}

export default Home;
