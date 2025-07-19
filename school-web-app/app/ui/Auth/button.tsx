import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        'bg-indigo-950 font-bold text-white px-4 sm:px-20 py-3',
        className
      )}
    >
      {children}
    </button>
  );
}
