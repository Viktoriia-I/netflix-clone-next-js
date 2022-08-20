import Link from 'next/link';
import { useEffect, useState } from 'react';
import { UserIcon } from '@heroicons/react/solid';

import BasicMenu from './BasicMenu';
import { headerLinks } from '../helpers/helperConstants';
import netflixLogo from '../img/netflix-logo-png-2562.png';
import useAuth from '../hooks/useAuth';

function Header() {
  const { logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src={netflixLogo.src}
          alt='Netflix Logo'
          width={120}
          height={120}
          className="cursor-pointer object-contain"
        />
        <BasicMenu />
        <ul className="hidden space-x-4 md:flex">
          {headerLinks?.map(headerLink => <li className="headerLink">{headerLink}</li>)}
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">
        <Link href="/account">
          <UserIcon className="h-7 w-7 cursor-pointer" />
        </Link>
        <button className="text-lg font-medium hover:underline" onClick={logout}>Sign Out</button>
      </div>
    </header>
  )
}

export default Header;