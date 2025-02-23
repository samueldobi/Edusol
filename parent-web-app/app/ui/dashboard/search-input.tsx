import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function SearchInput() {
  return (
    <div className="relative max-w-md">
      {/* 🔍 Magnifying Glass Icon */}
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-100" />

      {/* Input Field */}
      <input
        type="text"
        style={{ backgroundColor: '#49DF6AC2' }}
        className="w-full pl-10 pr-4 py-2 border-0  rounded-lg bg-transparent text-neutral-100 focus:ring-2 focus:ring-green-500 focus:border-green-500  outline-none "
      />
    </div>
  );
}
