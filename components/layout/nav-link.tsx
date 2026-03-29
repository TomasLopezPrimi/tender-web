import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavItem } from "./navbar"
import { ChevronDown } from "lucide-react"

export default function NavLink({ item }: { item: NavItem }) {
    const pathname = usePathname() 
    
    const isActive = item.href === "/" 
      ? pathname === "/" 
      : pathname.startsWith(item.href)
  
    return (
      <div className="group relative flex items-center">
        <Link
          href={item.href}
          className={`relative flex items-center gap-1 px-3 py-1.5 text-xs font-semibold tracking-wider transition-colors rounded ${
            item.highlighted
              ? "bg-(--tender-cyan) text-white hover:bg-(--tender-cyan)/90"
              : isActive
              ? "text-(--tender-cyan)" 
              : "text-(--tender-text-dark) hover:text-(--tender-cyan)"
          }`}
        >
        {item.label}
        {item.hasDropdown && (
          <ChevronDown size={13} className="opacity-70 transition-transform duration-200 group-hover:rotate-180" aria-hidden="true" />
        )}
        
        {!item.highlighted && (
          <span 
            className={`absolute -bottom-1 left-0 h-[2px] bg-(--tender-cyan) transition-all duration-300 ${
              isActive ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        )}
        </Link>

        {item.hasDropdown && item.subItems && (
          <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <div className="bg-white border border-border/50 rounded-md shadow-xl overflow-hidden py-1">
              <ul className="flex flex-col">
                {item.subItems.map((subItem) => (
                  <li key={subItem.href}>
                    <Link
                      href={subItem.href}
                      className="block px-4 py-2.5 text-sm font-medium text-(--tender-navy) hover:bg-muted hover:text-(--tender-cyan) transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    )
  }