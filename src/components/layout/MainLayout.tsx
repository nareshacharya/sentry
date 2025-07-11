import Header from "./Header";
import Footer from "./Footer";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen text-gray-900 dark:text-gray-100">
      <Header />
      <main className="flex-grow container mx-auto p-4 bg-white dark:bg-gray-950 dark:text-gray-100">{children}</main>
      <Footer />
    </div>
  );
}
