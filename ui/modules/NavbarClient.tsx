"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CTA from "../components/CTA";
import LogoLight from "../icons/LogoLight";
import Menu from "../icons/Menu";
import X from "../icons/X";

interface NavbarClientProps {
  logoUrl: string | null;
  logoTitle: string;
  svgContent: string | null;
  isLogoSvg: boolean;
  menuItems: Array<{ label: string; href: string }>;
  cta: any;
  backgroundColor: string;
}

export default function NavbarClient({
  logoUrl,
  logoTitle,
  svgContent,
  isLogoSvg,
  menuItems,
  cta,
}: NavbarClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const LogoComponent = () => {
    if (!logoUrl) {
      return <LogoLight className="h-14 w-auto" />;
    }

    if (isLogoSvg && svgContent) {
      // Add styling to the SVG content
      const styledSvg = svgContent.replace(
        '<svg',
        '<svg class="h-14 w-auto" style="height: 56px; width: auto;"'
      );
      return (
        <div 
          className="h-14 w-auto [&>svg]:h-14 [&>svg]:w-auto"
          dangerouslySetInnerHTML={{ __html: styledSvg }}
          role="img"
          aria-label={logoTitle}
        />
      );
    }

    return (
      <Image
        src={logoUrl}
        alt={logoTitle}
        width={56}
        height={56}
        className="h-14 w-auto"
        priority
        style={{ height: '56px', width: 'auto' }}
      />
    );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      id="navbar"
      className={`w-full sticky top-0 z-50 px-6 sm:px-8 lg:px-12 py-5 ${
        isMobileMenuOpen 
          ? "bg-warm-cream shadow-lg border-b-2" 
          : "backdrop-blur-xl bg-warm-cream/85 shadow-sm"
      } border-b-2 border-dark-forest-green/15 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo - Fixed width container to prevent layout shift */}
        <div className="flex items-center justify-start w-16 h-14">
          <Link href="/" className="block transform transition-transform duration-200 hover:scale-105">
            <LogoComponent />
          </Link>
        </div>

        {/* Navigation Menu - Fixed layout with predetermined space */}
        <div className="hidden md:flex items-center justify-center flex-1 h-14">
          <div className="flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <Link
                key={`nav-${index}`}
                href={item.href}
                className="relative py-3 px-4 text-dark-forest-green whitespace-nowrap
                         transition-all duration-200 ease-out
                         hover:text-medium-forest-green
                         group text-lg font-semibold"
              >
                <span className="relative z-10 block">
                  {item.label}
                </span>
                {/* Elegant underline */}
                <span 
                  className="absolute left-0 right-0 bottom-0 h-[2px]
                           bg-medium-forest-green
                           origin-center
                           transition-transform duration-200 ease-out
                           group-hover:scale-x-100 scale-x-0"
                ></span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Button - Enhanced positioning */}
        <div className="hidden sm:flex items-center justify-end">
          {cta && (
            <div className="transform transition-transform duration-200 hover:scale-105">
              <CTA {...cta.fields} />
            </div>
          )}
        </div>

        {/* Mobile Menu Button - Enhanced styling */}
        <div className="md:hidden">
          <CTA 
            variant="icon" 
            className="transform transition-all duration-200 hover:scale-110 hover:bg-dark-forest-green/5" 
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </CTA>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Enhanced Backdrop with smooth animation */}
          <div
            className="fixed top-0 left-0 right-0 bottom-0 bg-dark-forest-green/20 backdrop-blur-md z-40 md:hidden
                       animate-in fade-in duration-300"
            style={{ top: navRef.current?.offsetHeight || 88 }}
            onClick={closeMobileMenu}
          />

          {/* Enhanced Mobile Menu */}
          <div className="absolute top-full left-0 right-0 bg-warm-cream/95 backdrop-blur-md 
                         border-t border-dark-forest-green/10 shadow-xl z-50 md:hidden
                         animate-in slide-in-from-top-4 duration-300">
            <div className="px-6 py-6 space-y-1">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block px-4 py-4 text-lg font-sans text-dark-forest-green 
                           hover:text-medium-forest-green hover:bg-dark-forest-green/5 
                           rounded-xl transition-all duration-200 transform hover:translate-x-1
                           border border-transparent hover:border-dark-forest-green/10"
                  onClick={closeMobileMenu}
                >
                  {item.label}
                </Link>
              ))}
              {cta && (
                <div className="pt-4 border-t border-dark-forest-green/10 mt-4">
                  <CTA
                    {...cta.fields}
                    className="w-full transform transition-transform duration-200 hover:scale-105"
                    onClick={closeMobileMenu}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
}