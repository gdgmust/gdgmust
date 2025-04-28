import { useTranslations } from "next-intl";
import MainFrameCard from "@/components/contact/FirstLandingPage/MainFrameCard";

export default function ContactPage() {
  return (
    <div className="">
        <section>
            <MainFrameCard />
        </section>
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-lg mb-2">We'd love to hear from you!</p>
            <p className="text-lg mb-4">Please reach out to us at:</p>
            <a href="mailto:hello@gdgmust.dev" className="text-blue-500 hover:underline mb-4">email</a>
        </div>
    </div>
);
}