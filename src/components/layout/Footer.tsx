export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t py-4 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Sentry. All rights reserved.
    </footer>
  );
}
