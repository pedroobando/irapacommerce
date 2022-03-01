import { iAuthNavbarProps } from '../interface/interface';

export const AdminNavbar = ({ displayName, imagenUrl }: iAuthNavbarProps) => {
  return (
    <div className="flex w-full items-center justify-end bg-stone-300 py-4">
      <div className="mr-4 text-2xl">{displayName}</div>
      <img src={imagenUrl} className="mr-6 w-14 rounded-full" alt={displayName} />
    </div>
  );
};
