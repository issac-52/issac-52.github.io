interface TagProps {
  children: React.ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="font-mono text-[10.5px] text-teal bg-teal/10 px-2.5 py-1 rounded-md">
      {children}
    </span>
  );
}
