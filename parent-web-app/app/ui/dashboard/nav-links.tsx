import Link from 'next/link';

const links = [
  {
    name: 'Dashboard',
    href: '/dashboard',
  },
  {
    name: 'Payment',
    href: '/dashboard/payment',
  },
  {
    name: 'Result',
    href: '/dashboard/result',
  },
  {
    name: 'Assignment',
    href: '/dashboard/assignment',
  },
  {
    name: 'Teacher',
    href: '/dashboard/teacher',
  },
  {
    name: 'Calendar',
    href: '/dashboard/calendar',
  },
  {
    name: 'Activities',
    href: '/dashboard/activities',
  },
  {
    name: 'Users',
    href: '/dashboard/users',
  },
  {
    name: 'Lesson Notes',
    href: '/dashboard/lesson-notes',
  },
];

export default function NavLinks() {
  return (
    <div className="p-4">
      {links.map((link) => {
        return (
          <Link
            href={link.href}
            key={link.name}
            className="flex h-[48px] grow justify-center text-neutral-600 items-center gap-2 rounded-md p-3 text-xl font-normal hover:bg-green-200  hover:text-green-600 hover:font-semibold md:flex-none md:justify-start md:p-1 md:px-9"
          >
            <p>{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
