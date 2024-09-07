'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun, BarChart, Package, Users, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from "@/components/AuthProvider"
import { useRouter } from "next/navigation"
import { Sales } from './Sales'
import { Inventory } from './Inventory'
import { Administration } from './Administration'
import { DashboardOverview } from './DashboardOverview'

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, component: DashboardOverview },
  { name: 'Sales', icon: BarChart, component: Sales },
  { name: 'Inventory', icon: Package, component: Inventory },
  { name: 'Administration', icon: Users, component: Administration },
]

export function Dashboard() {
  const { isAuthenticated, logout, isLoading, session } = useAuth();
  const router = useRouter();
  const [theme, setTheme] = useState('light')
  const [activeSection, setActiveSection] = useState('Dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated || !session) {
    return null;
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark')
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  }

  const ActiveComponent = navItems.find(item => item.name === activeSection)?.component || DashboardOverview;

  return (
    <div className={`min-h-screen bg-background text-foreground`}>
      <div className="bg-background text-foreground">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={toggleSidebar} className="lg:hidden">
              <Menu className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle menu</span>
            </Button>
            <h1 className="text-2xl font-bold">Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-[1.2rem] w-[1.2rem]" /> : <Sun className="h-[1.2rem] w-[1.2rem]" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User avatar" />
                    <AvatarFallback>YG</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Open user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex">
          <aside className={`${isSidebarOpen ? 'block' : 'hidden'} lg:block fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transition-all duration-300 ease-in-out`}>
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-xl font-semibold">Menu</h2>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
                <X className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Close menu</span>
              </Button>
            </div>
            <nav className="p-4">
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  variant={activeSection === item.name ? "secondary" : "ghost"}
                  className="w-full justify-start mb-2"
                  onClick={() => {
                    setActiveSection(item.name)
                    setIsSidebarOpen(false)
                  }}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </nav>
          </aside>
          <main className="flex-1 p-4 lg:ml-64 bg-background">
            <ActiveComponent />
          </main>
        </div>
      </div>
    </div>
  )
}