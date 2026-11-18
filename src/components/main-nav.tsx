/**
 * @file src/components/main-nav.tsx
 * @description Centered floating navigation header and global Command Palette mount.
 */
import DesktopNav from './desktop-nav';
import MobileNav from './mobile-nav';
import CommandPalette from './command-palette';

export default function MainNav() {
  return (
    <>
      <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-md md:w-auto md:max-w-none">
          <DesktopNav />
          <MobileNav />
        </div>
      </div>
      <CommandPalette />
    </>
  );
}
