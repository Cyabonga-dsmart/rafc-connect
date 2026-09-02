import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Building2, Check, Upload } from "lucide-react";

import { PageHeader } from "@/components/ui-bits";
import { leagues } from "@/data/rafc";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Player Registration — RAFC" },
      {
        name: "description",
        content:
          "Register a player with Randburg AFC in six steps: personal details, ID document, guardian info, previous club, consent and payment.",
      },
      { property: "og:title", content: "Player Registration — RAFC" },
      {
        property: "og:description",
        content: "Six-step RAFC player registration with document upload and EFT payment details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Register,
});

const positions = ["Goalkeeper", "Defender", "Midfielder", "Winger", "Striker"];
const genders = ["Male", "Female", "Other"];
const relationships = ["Mother", "Father", "Guardian", "Other"];
const stepTitles = [
  "Personal info",
  "ID document",
  "Guardian details",
  "Previous club",
  "Consent",
  "Payment",
];

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        maxLength={120}
        className="mt-1.5 w-full rounded-lg border border-input bg-secondary/60 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function Chips({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="mt-1.5 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`rounded-full px-3.5 py-1.5 font-display text-[0.7rem] uppercase tracking-[0.12em] transition-colors ${
            value === o ? "cta-accent" : "bg-secondary text-muted-foreground"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

function UploadButton({ label }: { label: string }) {
  const [name, setName] = useState<string | null>(null);
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-dashed border-input bg-secondary/40 px-4 py-4 text-sm">
      <Upload className="h-4 w-4 text-accent" />
      <span className="min-w-0 flex-1 truncate">{name ?? label}</span>
      <input
        type="file"
        accept="image/*,application/pdf"
        className="hidden"
        onChange={(e) => setName(e.target.files?.[0]?.name ?? null)}
      />
    </label>
  );
}

function Register() {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("Male");
  const [position, setPosition] = useState("Midfielder");
  const [league, setLeague] = useState(leagues[1]!.slug);
  const [docType, setDocType] = useState("SA ID");
  const [relationship, setRelationship] = useState("Mother");
  const [prevClub, setPrevClub] = useState("No");
  const [consents, setConsents] = useState([false, false, false, false]);
  const [submitted, setSubmitted] = useState(false);

  const consentLabels = [
    "I consent to photographs and match footage of the player being used by RAFC.",
    "I have read and accept the RAFC code of conduct.",
    "I accept the club terms & conditions and privacy policy.",
    "I am the parent/legal guardian and declare all information provided is true.",
  ];

  const canNext = step !== 5 || consents.every(Boolean);

  if (submitted) {
    return (
      <div className="px-5 pb-10 pt-16 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full cta-accent">
          <Check className="h-8 w-8" />
        </div>
        <h1 className="mt-5 text-2xl font-bold uppercase">Registration submitted</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          A club coach will review the documents and confirm the registration. You'll get a notification once
          it's approved.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
          className="mt-6 w-full rounded-lg bg-secondary py-3 font-display text-sm uppercase tracking-[0.14em]"
        >
          Register another player
        </button>
      </div>
    );
  }

  return (
    <div className="pb-10">
      <PageHeader title="Registration" subtitle={`Step ${step} of 6 · ${stepTitles[step - 1]}`} />

      <div className="px-5">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
          <div
            className="accent-bar h-full rounded-full transition-all"
            style={{ width: `${(step / 6) * 100}%` }}
          />
        </div>
      </div>

      <form className="mt-6 space-y-4 px-5" onSubmit={(e) => e.preventDefault()}>
        {step === 1 && (
          <div className="surface space-y-4 p-5">
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" placeholder="Thabo" />
              <Field label="Last name" placeholder="Mokoena" />
            </div>
            <Field label="Date of birth" type="date" />
            <div>
              <span className="eyebrow">Gender</span>
              <Chips options={genders} value={gender} onChange={setGender} />
            </div>
            <Field label="Phone" type="tel" placeholder="082 000 0000" />
            <Field label="Email" type="email" placeholder="player@example.co.za" />
            <Field label="School" placeholder="Randburg High School" />
            <div>
              <span className="eyebrow">Preferred position</span>
              <Chips options={positions} value={position} onChange={setPosition} />
            </div>
            <div>
              <span className="eyebrow">League</span>
              <Chips options={leagues.map((l) => l.slug)} value={league} onChange={setLeague} />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="surface space-y-4 p-5">
            <div>
              <span className="eyebrow">Document type</span>
              <Chips options={["SA ID", "Passport"]} value={docType} onChange={setDocType} />
            </div>
            <Field label={`${docType} number`} placeholder={docType === "SA ID" ? "0000000000000" : "A01234567"} />
            <div>
              <span className="eyebrow">Upload document</span>
              <div className="mt-1.5">
                <UploadButton label="Upload photo or PDF" />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="surface space-y-4 p-5">
            <div>
              <span className="eyebrow">Relationship to player</span>
              <Chips options={relationships} value={relationship} onChange={setRelationship} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" placeholder="Palesa" />
              <Field label="Surname" placeholder="Mokoena" />
            </div>
            <Field label="Cellphone" type="tel" placeholder="083 000 0000" />
            <Field label="Email" type="email" placeholder="guardian@example.co.za" />
            <Field label="ID number" placeholder="0000000000000" />
            <Field label="Home address" placeholder="12 Republic Rd, Randburg" />
          </div>
        )}

        {step === 4 && (
          <div className="surface space-y-4 p-5">
            <div>
              <span className="eyebrow">Played for a previous club?</span>
              <Chips options={["Yes", "No"]} value={prevClub} onChange={setPrevClub} />
            </div>
            {prevClub === "Yes" && (
              <>
                <Field label="Previous club name" placeholder="Fourways United" />
                <div>
                  <span className="eyebrow">Clearance letter</span>
                  <div className="mt-1.5">
                    <UploadButton label="Upload clearance letter" />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {step === 5 && (
          <div className="surface space-y-3 p-5">
            {consentLabels.map((label, i) => (
              <label key={label} className="flex cursor-pointer items-start gap-3 rounded-lg bg-secondary/50 p-3">
                <input
                  type="checkbox"
                  checked={consents[i]}
                  onChange={(e) =>
                    setConsents((c) => c.map((v, idx) => (idx === i ? e.target.checked : v)))
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--pitch)]"
                />
                <span className="text-sm text-silver">{label}</span>
              </label>
            ))}
            {!consents.every(Boolean) && (
              <p className="text-xs text-muted-foreground">All boxes must be ticked to continue.</p>
            )}
          </div>
        )}

        {step === 6 && (
          <div className="space-y-4">
            <div className="surface overflow-hidden">
              <div className="accent-bar h-1 w-full" />
              <div className="p-5">
                <p className="eyebrow">Registration fee</p>
                <p className="mt-1 font-display text-4xl font-bold">R350</p>
                <p className="mt-1 text-xs text-muted-foreground">2026 season · per player · non-refundable</p>
              </div>
            </div>

            <div className="surface p-5">
              <p className="flex items-center gap-2 font-display text-sm uppercase tracking-[0.14em]">
                <Building2 className="h-4 w-4 text-accent" /> EFT bank details
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                {[
                  ["Bank", "Standard Bank"],
                  ["Account name", "Randburg AFC"],
                  ["Account number", "012 345 678"],
                  ["Branch code", "051001"],
                  ["Reference", "Player name + league"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3 border-b border-border pb-2 last:border-0">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <UploadButton label="Upload proof of payment" />
          </div>
        )}

        <div className="flex gap-3 pt-1">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => Math.max(1, s - 1))}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary py-3 font-display text-sm uppercase tracking-[0.14em] disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          {step < 6 ? (
            <button
              type="button"
              disabled={!canNext}
              onClick={() => setStep((s) => Math.min(6, s + 1))}
              className="cta-accent flex flex-1 items-center justify-center gap-2 rounded-lg py-3 font-display text-sm uppercase tracking-[0.14em] disabled:opacity-40 disabled:shadow-none"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setSubmitted(true)}
              className="cta-accent flex flex-1 items-center justify-center gap-2 rounded-lg py-3 font-display text-sm uppercase tracking-[0.14em]"
            >
              Submit <Check className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
