import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Check } from "lucide-react";
import { SITE_CONTENT } from "../data/content";
import { PageHero } from "../components/shared/PageHero";
import { Magnetic } from "../components/shared/Magnetic";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const field =
    "w-full rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-3.5 text-sm text-blue-950 placeholder:text-blue-400 focus:border-blue-500 focus:outline-none transition-colors";

  return (
    <main className="bg-white">
      <PageHero
        badge="Contact"
        title="Let's build"
        accentText="amazing"
        description="Have a project in mind? We'd love to hear about it. Let's talk about how we can turn your digital dreams into reality."
      />

      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left info */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-4"
            >
              <a
                href={`mailto:${SITE_CONTENT.contact.email}`}
                className="group flex items-center gap-4 rounded-2xl border border-blue-100 p-5 transition-all duration-300 hover:border-blue-400 hover:bg-blue-50/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  <Mail size={18} />
                </span>
                <div>
                  <div className="text-xs text-blue-950/40">Email us</div>
                  <div className="font-medium text-blue-950">{SITE_CONTENT.contact.email}</div>
                </div>
              </a>

              <div className="flex items-center gap-4 rounded-2xl border border-blue-100 p-5">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  <MapPin size={18} />
                </span>
                <div>
                  <div className="text-xs text-blue-950/40">Location</div>
                  <div className="font-medium text-blue-950">{SITE_CONTENT.contact.location}</div>
                </div>
              </div>

              {/* map placeholder */}
              <div className="relative h-44 overflow-hidden rounded-2xl border border-blue-100 bg-blue-50/50">
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, rgba(47,107,255,0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(47,107,255,0.12) 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="relative flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-500 opacity-50" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-blue-600 ring-4 ring-white" />
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right form */}
          <div className="lg:col-span-7 lg:col-start-6">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-3xl border border-blue-100 bg-blue-50/40 p-12 text-center"
              >
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                  <Check size={28} />
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium text-blue-950">Message Sent!</h3>
                <p className="mt-2 text-blue-950/55">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-blue-950/60">Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="John Doe" className={field} />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-blue-950/60">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="john@company.com" className={field} />
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-blue-950/60">Company</label>
                  <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Your company name" className={field} />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-blue-950/60">Service interested in</label>
                  <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={`${field} appearance-none`}>
                    <option value="">Select a service</option>
                    {SITE_CONTENT.services.map((s) => (
                      <option key={s.id} value={s.id}>{s.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-blue-950/60">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your project..." className={`${field} resize-none`} />
                </div>
                <Magnetic strength={0.25}>
                  <button
                    type="submit"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 sm:w-auto"
                  >
                    Send Message
                    <Send size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                </Magnetic>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
