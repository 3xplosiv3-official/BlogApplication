function Footer() {
  // Get current year for copyright
  const year = new Date().getFullYear();

  return (
    <footer className="p-4 border-t border-gray-100">
      <div className="text-xs text-center text-gray-500">
        Copyleft {year}. All lefts reserved. Made with ❤️
      </div>
    </footer>
  );
}

export default Footer;
