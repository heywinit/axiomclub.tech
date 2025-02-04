import { Metadata } from "next";
import Contact from "./Contact";

export const metadata: Metadata = {
  title: "Contact | Axiom Club",
  description:
    "Get in touch with Axiom Club. We're here to help with your next big tech project.",
};

export default function ContactPage() {
  return <Contact />;
}
