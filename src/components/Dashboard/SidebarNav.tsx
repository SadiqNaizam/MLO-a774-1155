import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  LayoutDashboard,
  Users,
  UserCircle2,
  FileText,
  Receipt,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu as MenuIcon,
} from 'lucide-react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href?: string;
  isActive?: boolean;
  isCollapsed?: boolean;
  onClick?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, href = '#', isActive, isCollapsed, onClick }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center px-4 py-2.5 text-sm font-medium rounded-md transition-colors',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-foreground/70 hover:bg-gray-200 hover:text-foreground',
        isCollapsed ? 'justify-center' : ''
      )}
    >
      <Icon className={cn('h-5 w-5', isCollapsed ? '' : 'mr-3')} />
      {!isCollapsed && <span>{label}</span>}
    </a>
  );
};

interface SidebarNavProps {
  className?: string;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ className }) => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(false);
  const [activeItem, setActiveItem] = React.useState<string>('Dashboard');

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard' as const },
    { icon: Users, label: 'Leads' as const },
    { icon: UserCircle2, label: 'Customers' as const },
    { icon: FileText, label: 'Proposals' as const },
    { icon: Receipt, label: 'Invoices' as const },
    { icon: ShoppingCart, label: 'Items' as const },
    { icon: Mail, label: 'Mail' as const },
    { icon: Archive, label: 'Shoebox' as const },
    { icon: CalendarDays, label: 'Calendar' as const },
  ];

  const bottomNavItems = [
    { icon: HelpCircle, label: 'Help' as const },
    { icon: Settings, label: 'Settings' as const },
  ];

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 h-full bg-sidebar text-foreground flex flex-col transition-all duration-300 ease-in-out',
        isCollapsed ? 'w-20' : 'w-64',
        className
      )}
    >
      <div className={cn('flex items-center border-b border-border', isCollapsed ? 'h-16 justify-center' : 'h-16 px-6 justify-between')}>
        {!isCollapsed && (
          <div className='flex items-center space-x-2'>
            <Avatar className='h-8 w-8 bg-primary flex items-center justify-center'>
              <AvatarFallback className='text-primary-foreground font-bold text-lg'>BO</AvatarFallback>
            </Avatar>
             {/* <span className='font-semibold text-lg'>Brand</span> commented out as image only shows BO */}
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className='p-1 rounded-md hover:bg-gray-200 text-foreground/70'
        >
          <MenuIcon size={20} />
        </button>
      </div>

      <nav className='flex-grow px-3 py-4 space-y-1 overflow-y-auto'>
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activeItem === item.label}
            isCollapsed={isCollapsed}
            onClick={() => setActiveItem(item.label)}
          />
        ))}
      </nav>

      <div className='mt-auto border-t border-border px-3 py-4 space-y-1'>
        {bottomNavItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isCollapsed={isCollapsed}
            onClick={() => setActiveItem(item.label)}
            isActive={activeItem === item.label}
          />
        ))}
      </div>
    </aside>
  );
};

export default SidebarNav;
