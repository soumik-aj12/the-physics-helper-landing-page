"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Announcement {
  id: number
  content: string
  date: Date
}

const announcements: Announcement[] = [
  { id: 1, content: "New Quantum Computing course starting next month!", date: new Date(2023, 5, 15) },
  { id: 2, content: "Physics Helper awarded 'Best Science Education Platform 2023'", date: new Date(2023, 5, 10) },
  { id: 3, content: "Join our upcoming webinar on Dark Matter theories", date: new Date(2023, 5, 5) },
  { id: 4, content: "Summer internships now open for applications", date: new Date(2023, 4, 30) },
  {
    id: 5,
    content: "Congratulations to Dr. Smith for winning the Nobel Prize in Physics!",
    date: new Date(2025, 7, 8),
  },
]

export function NotificationBell() {
  const [isShaking, setIsShaking] = useState(false)
  const [hasNewNotification, setHasNewNotification] = useState(false)

  useEffect(() => {
    const threeDaysAgo = new Date()
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3)
    // console.log(threeDaysAgo);
    
    const newNotification = announcements.filter((announcement) => announcement.date > threeDaysAgo)
    // console.log(newNotification);
    
    setHasNewNotification(newNotification.length > 0)
  }, [])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={`relative ${isShaking ? "animate-shake" : ""}`}
          onMouseEnter={() => setIsShaking(true)}
          onMouseLeave={() => setIsShaking(false)}
          onAnimationEnd={() => setIsShaking(false)}
          onClick={()=>console.log("Notification Bell Clicked")}
        >
          <Bell className="h-6 w-6" />
          {hasNewNotification && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <h3 className="font-semibold mb-2">Announcements</h3>
        <ScrollArea className="h-[300px]">
          {announcements.sort((a, b) => b.date.getTime() - a.date.getTime()).map((announcement) => (
            <div key={announcement.id} className="mb-4 last:mb-0">
              <p className="text-sm">{announcement.content}</p>
              <p className="text-xs text-gray-500 mt-1">{announcement.date.toLocaleDateString()}</p>
            </div>
          ))}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

