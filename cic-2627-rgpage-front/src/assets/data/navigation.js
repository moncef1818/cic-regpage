/**
 * Navigation links — single source of truth for all nav items.
 * Used by Navbar and any sidebar / mobile nav.
 */import {
  House,
  Clock3,
  Building2,
  Images,
  ArrowRight,
} from 'lucide-react';

export const navLinks = [
  { to: '/',            icon: House,     label: 'Home' },
  { to: '/past-events', icon: Clock3,    label: 'Past Events' },
  { to: '/departments', icon: Building2, label: 'Departments' },
  { to: '/gallery',     icon: Images,    label: 'Gallery' },
  { to: '/register',    icon: ArrowRight, label: 'Register' },
];