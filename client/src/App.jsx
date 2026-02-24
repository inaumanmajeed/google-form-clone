import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "./components/TextField";
import RadioGroup from "./components/RadioGroup";
import CheckboxGroup from "./components/CheckboxGroup";
import SelectField from "./components/SelectField";
import TextArea from "./components/TextArea";
import Banner from "./components/Banner";
import SectionCard from "./components/SectionCard";
import { useState, useEffect } from "react";
import Toast from "./components/Toast";
import countryList from "country-list";

const schema = z.object({
  fullName: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Enter a valid email" }),
  age: z.string().optional(),
  gender: z.string().optional(),
  hobbies: z.array(z.string()).optional(),
  country: z.string().optional(),
  about: z.string().optional(),
  agree: z
    .boolean()
    .refine((v) => v === true, { message: "You must agree to continue" }),
  qualification: z.string().optional(),
  institution: z.string().optional(),
  gradYear: z.string().optional(),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  experience: z.string().optional(),
  linkedin: z.string().optional(),
  website: z.string().optional(),
});
const initialValues = {
  fullName: "",
  email: "",
  age: "",
  gender: "",
  hobbies: [],
  country: "PK",
  about: "",
  agree: false,
  qualification: "",
  institution: "",
  gradYear: "",
  company: "",
  jobTitle: "",
  experience: "",
  linkedin: "",
  website: "",
};
export default function App() {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const countryOptions = countryList.getData().map((c) => ({
    value: c.code,
    label: c.name,
  }));
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "info" });
  const [submissionBlocked, setSubmissionBlocked] = useState(false);
  const [submissionInfo, setSubmissionInfo] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("form_submitted");
      if (raw) {
        const info = JSON.parse(raw);
        setSubmissionInfo(info);
        setSubmissionBlocked(true);
      }
    } catch (e) {}
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5010/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      let body = {};
      try {
        body = await res.json();
      } catch (e) {}

      if (res.status === 409) {
        setToast({
          message: body.error || "Form already submitted with this email.",
          type: "error",
        });
        localStorage.setItem(
          "form_submitted",
          JSON.stringify({ email: data.email || "", time: Date.now() }),
        );
        setSubmissionBlocked(true);
        return;
      }

      if (!res.ok) {
        setToast({ message: body.error || "Submission failed", type: "error" });
        return;
      }

      try {
        localStorage.setItem(
          "form_submitted",
          JSON.stringify({ email: data.email || "", time: Date.now() }),
        );
      } catch (e) {}
      setSubmissionBlocked(true);
      reset();
      setToast({ message: "Form submitted successfully.", type: "success" });
    } catch (err) {
      setToast({ message: "Network error", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-10">
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "info" })}
      />

      {submissionBlocked ? (
        <div className="w-full max-w-3xl space-y-6">
          <Banner
            title="Form already submitted"
            subtitle="Thank you — we've received your response."
          />
          <SectionCard
            title="Submission received"
            description="You cannot submit this form again."
          >
            <div className="text-sm text-gray-700">
              <p>
                We already received your submission
                {submissionInfo?.email ? ` from ${submissionInfo.email}` : ""}.
              </p>
              {submissionInfo?.time && (
                <p className="mt-2 text-gray-500">
                  Submitted at: {new Date(submissionInfo.time).toLocaleString()}
                </p>
              )}
            </div>
          </SectionCard>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-3xl space-y-6"
        >
          <Banner
            title="Basic Form"
            subtitle="A demo form showcasing various question types and features."
          />

          <SectionCard
            title="Description"
            description={
              "Assignment: build a single-submit form (React front-end + Node/Express back-end). This demo implements the requirement: the form can be opened and submitted once; on subsequent opens the user is shown a message that they've already submitted."
            }
          >
            <div className="text-sm text-gray-700 space-y-2">
              <p>
                This project implements the assignment: a React-based front-end
                that posts responses to a Node + Express back-end. Submission
                flow:
              </p>
              <ul className="list-disc pl-5">
                <li>Open the form (first time): fill and submit.</li>
                <li>
                  On submit: the front-end POSTs JSON to the Express endpoint
                  and records submission in <code>localStorage</code>.
                </li>
                <li>
                  Subsequent opens: the app detects the prior submission
                  (localStorage/server) and shows a dialog "You already
                  submitted this form." preventing another submission.
                </li>
              </ul>
              <p className="mt-2">
                Notes: this demo also shows how to validate fields & display
                errors.
              </p>
              <p className="mt-1 font-medium">
                I'm implementing this assignment: building the React UI,
                controlled inputs with react-hook-form, validation with Zod, and
                a Node/Express route to accept responses.
              </p>
            </div>
          </SectionCard>

          <SectionCard
            title="Basic Information"
            description="Please enter your personal details."
          >
            <TextField
              name="fullName"
              control={control}
              label="Name *"
              placeholder="Your answer"
              error={errors.fullName?.message}
            />
            <TextField
              name="email"
              control={control}
              label="Email *"
              placeholder="Your answer"
              type="email"
              error={errors.email?.message}
            />
            <div className="grid grid-cols-2 gap-4">
              <TextField
                name="age"
                control={control}
                label="Age"
                type="number"
                placeholder="Your answer"
                error={errors.age?.message}
              />
              <SelectField
                name="country"
                control={control}
                label="Country"
                options={countryOptions}
                error={errors.country?.message}
              />
            </div>
            <RadioGroup
              name="gender"
              control={control}
              label="Gender"
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
                { value: "Other", label: "Other" },
              ]}
              error={errors.gender?.message}
            />
          </SectionCard>

          <SectionCard
            title="Educational Info"
            description="Tell us about your education"
          >
            <TextField
              name="qualification"
              control={control}
              label="Highest Qualification"
              placeholder="e.g. B.Sc, M.Sc"
              error={errors.qualification?.message}
            />
            <TextField
              name="institution"
              control={control}
              label="Institution"
              placeholder="Your school/university"
              error={errors.institution?.message}
            />
            <TextField
              name="gradYear"
              control={control}
              label="Graduation Year"
              placeholder="YYYY"
              type="number"
              error={errors.gradYear?.message}
            />
          </SectionCard>

          <SectionCard
            title="Job Details"
            description="Current work information"
          >
            <TextField
              name="company"
              control={control}
              label="Company"
              placeholder="Company name"
              error={errors.company?.message}
            />
            <TextField
              name="jobTitle"
              control={control}
              label="Job Title"
              placeholder="Your role"
              error={errors.jobTitle?.message}
            />
            <TextField
              name="experience"
              control={control}
              label="Years of Experience"
              placeholder="e.g. 3"
              type="number"
              error={errors.experience?.message}
            />
          </SectionCard>

          <SectionCard
            title="Hobbies"
            description="Select your hobbies and add any other interests"
          >
            <CheckboxGroup
              name="hobbies"
              control={control}
              label="Hobbies"
              options={[
                { value: "Coding", label: "Coding" },
                { value: "Sports", label: "Sports" },
                { value: "Reading", label: "Reading" },
                { value: "Traveling", label: "Traveling" },
                { value: "Music", label: "Music" },
                { value: "Cooking", label: "Cooking" },
                { value: "Other", label: "Other" },
              ]}
              error={errors.hobbies?.message}
            />
            <TextArea
              name="about"
              control={control}
              label="Tell us more"
              placeholder="Share anything else about yourself"
              error={errors.about?.message}
            />
          </SectionCard>

          <SectionCard title="Additional" description="Optional questions">
            <TextField
              name="linkedin"
              control={control}
              label="LinkedIn"
              placeholder="Profile URL"
              error={errors.linkedin?.message}
            />
            <TextField
              name="website"
              control={control}
              label="Website"
              placeholder="Your website"
              error={errors.website?.message}
            />
          </SectionCard>

          <div className="flex items-center justify-between">
            <div className="w-full">
              <div className="relative">
                <Controller
                  control={control}
                  name="agree"
                  render={({ field }) => (
                    <label className="inline-flex items-center">
                      <input
                        type="checkbox"
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        className="mr-2"
                      />
                      I agree to terms
                    </label>
                  )}
                />
                {errors.agree && (
                  <p
                    className="text-sm text-red-600 absolute left-0"
                    style={{ top: "calc(100% + 0px)" }}
                  >
                    {errors.agree.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600"}`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
