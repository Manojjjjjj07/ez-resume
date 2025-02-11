import logo from "@/assets/logo.png";
import resumePreview from "@/assets/JaggusSparrow.jpg";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-900 px-5 py-12 text-center text-gray-100 md:flex-row md:text-start lg:gap-12">
      {/* Top-Left Branding */}
      <header className="absolute top-6 left-6 text-lg font-semibold tracking-wide">
        <h3 className="text-gray-300">
          With Love,{" "}
          <Link
            href="https://github.com/Manojjjjjj07"
            className="bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent font-extrabold hover:underline"
            target="_blank"
          >
            SKM ❤️
          </Link>
        </h3>
      </header>

      {/* Left Section - Logo & Text */}
      <div className="max-w-prose space-y-4">
        <div className="flex items-center gap-3">
          <Image src={logo} alt="Logo" width={50} height={50} />
          <h2 className="text-3xl font-extrabold text-red-400">EZ Resume</h2>
        </div>

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Create the{" "}
          <span className="inline-block bg-gradient-to-r from-red-500 to-red-400 bg-clip-text text-transparent">
            Perfect Resume
          </span>{" "}
          in Minutes
        </h1>
        <p className="text-lg text-gray-400">
          Build a job-winning resume effortlessly with our smart{" "}
          <span className="font-bold">AI-powered</span> resume builder!
        </p>
        <Button asChild size="lg" variant="premium">
          <Link href="/resumes">Get Started</Link>
        </Button>
      </div>

      {/* Right Section - Resume Preview */}
      <div>
        <Image
          src={resumePreview}
          alt="Resume preview"
          width={600}
          className="shadow-lg rounded-md lg:rotate-[1.5deg]"
        />
      </div>
    </main>
  );
}
