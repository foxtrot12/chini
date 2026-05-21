import React, { useEffect, useRef, useState } from "react";
import { fromEvent } from "rxjs";
import { map, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { useTranslation } from "../hooks/useTranslation";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export const Contact: React.FC = () => {
  const { t } = useTranslation();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const messageRef = useRef<HTMLTextAreaElement | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!nameRef.current || !emailRef.current || !messageRef.current) return;

    // RxJS stream validations: debounce user key strokes
    const nameSub = fromEvent(nameRef.current, "input")
      .pipe(
        map((e) => (e.target as HTMLInputElement).value),
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe((val) => {
        setErrors((prev) => ({
          ...prev,
          name: val.trim() === "" ? t("contact.form.error.name") : "",
        }));
      });

    const emailSub = fromEvent(emailRef.current, "input")
      .pipe(
        map((e) => (e.target as HTMLInputElement).value),
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe((val) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors((prev) => ({
          ...prev,
          email:
            val.trim() === ""
              ? ""
              : !emailRegex.test(val)
                ? t("contact.form.error.email")
                : "",
        }));
      });

    const messageSub = fromEvent(messageRef.current, "input")
      .pipe(
        map((e) => (e.target as HTMLTextAreaElement).value),
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe((val) => {
        setErrors((prev) => ({
          ...prev,
          message:
            val.trim() === ""
              ? ""
              : val.trim().length < 10
                ? t("contact.form.error.message")
                : "",
        }));
      });

    return () => {
      nameSub.unsubscribe();
      emailSub.unsubscribe();
      messageSub.unsubscribe();
    };
  }, [t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasNameError = formData.name.trim() === "";
    const hasEmailError = !emailRegex.test(formData.email);
    const hasMessageError = formData.message.trim().length < 10;

    if (hasNameError || hasEmailError || hasMessageError) {
      setErrors({
        name: hasNameError ? t("contact.form.error.name") : "",
        email: hasEmailError ? t("contact.form.error.email") : "",
        message: hasMessageError ? t("contact.form.error.message") : "",
      });
      return;
    }

    setStatus("sending");

    // Simulate reactive ajax response
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }, 1500);
  };

  return (
    <section
      id="contact"
      className="py-24 px-6 max-w-3xl mx-auto border-t border-glass-border/40"
    >
      <div className="text-center mb-12 flex flex-col items-center gap-3">
        <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white">
          {t("contact.title")}
        </h2>
        <p className="text-text-secondary text-base md:text-lg max-w-2xl font-light">
          {t("contact.subtitle")}
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 md:p-8 rounded-2xl glass-panel bg-glass-bg flex flex-col gap-6"
      >
        {/* Name field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-text-primary"
          >
            {t("contact.form.name")}
          </label>
          <input
            ref={nameRef}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            disabled={status === "sending"}
            className="px-4 py-3 rounded-xl border border-glass-border bg-bg-secondary text-white placeholder-text-secondary/50 focus:outline-none focus:border-primary transition-colors text-sm"
          />
          {errors.name && (
            <div className="flex items-center gap-1 text-xs text-secondary mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.name}</span>
            </div>
          )}
        </div>

        {/* Email field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-text-primary"
          >
            {t("contact.form.email")}
          </label>
          <input
            ref={emailRef}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="john@example.com"
            disabled={status === "sending"}
            className="px-4 py-3 rounded-xl border border-glass-border bg-bg-secondary text-white placeholder-text-secondary/50 focus:outline-none focus:border-secondary transition-colors text-sm"
          />
          {errors.email && (
            <div className="flex items-center gap-1 text-xs text-secondary mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.email}</span>
            </div>
          )}
        </div>

        {/* Message field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="message"
            className="text-sm font-semibold text-text-primary"
          >
            {t("contact.form.message")}
          </label>
          <textarea
            ref={messageRef}
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Tell me about your project..."
            disabled={status === "sending"}
            className="px-4 py-3 rounded-xl border border-glass-border bg-bg-secondary text-white placeholder-text-secondary/50 focus:outline-none focus:border-accent transition-colors text-sm resize-none"
          />
          {errors.message && (
            <div className="flex items-center gap-1 text-xs text-secondary mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors.message}</span>
            </div>
          )}
        </div>

        {/* Submit status */}
        {status === "success" && (
          <div className="flex items-center gap-2 p-4 rounded-xl border border-primary/20 bg-primary/5 text-primary text-sm font-medium animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>{t("contact.form.success")}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary text-white hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 cursor-pointer shadow-lg hover:shadow-primary/20 text-sm"
        >
          {status === "sending" ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>{t("contact.form.sending")}</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{t("contact.form.send")}</span>
            </>
          )}
        </button>
      </form>
    </section>
  );
};
