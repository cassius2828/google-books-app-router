export const NAV_LINKS = (publicUserID: string) => [
  { href: "/", label: "Home" },
  { href: "/search", label: "Search" },
  { href: "/users", label: "Community" },
  {
    href: publicUserID
      ? `/reading-list/${publicUserID}`
      : "/reading-list",
    label: publicUserID ? "My Reads" : "Reading List",
  },
];
