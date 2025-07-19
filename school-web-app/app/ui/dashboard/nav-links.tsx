'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Payment', href: '/dashboard/payment' },
  { name: 'Result', href: '/dashboard/result' },
  { name: 'Assignment', href: '/dashboard/assignment' },
  { name: 'Teacher', href: '/dashboard/teacher' },
  { name: 'Users', href: '/dashboard/users' },
  { name: 'Subjects', href: '/dashboard/subjects' },
  { name: 'Classes', href: '/dashboard/classes' },
  // { name: 'Admin', href: '/dashboard/admin' },
  // { name: 'Calendar', href: '/dashboard/calendar' },
  // { name: 'Activities', href: '/dashboard/activities' },
  // { name: 'Lesson Notes', href: '/dashboard/lesson-notes' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="space-y-1 px-2 py-4">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            className={`block px-3 py-2 text-sm font-normal rounded-md transition-colors duration-150 ease-in-out
              ${
                isActive
                  ? 'bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}
