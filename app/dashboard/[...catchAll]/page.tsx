import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grid place-items-center h-full">
      <div className="text-center">
        <h2 className="font-bold text-2xl mb-5">
          404 | This page doesn't exist.
        </h2>
        <p>
          Oops! Looks like you're lost in the dashboard. Let's get you back on
          track{" "}
          <Link href="/" className="text-teal-500">
            right here.
          </Link>
        </p>
      </div>
    </section>
  );
}
