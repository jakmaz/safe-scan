export default function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="py-4 text-center">
      <p className="text-sm">
        &copy; {currentYear} SafeScan. All rights reserved.
      </p>
    </footer>
  );
}
