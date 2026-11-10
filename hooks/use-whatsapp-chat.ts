"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"
import { config } from "@/config"

export function useWhatsAppChat() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [userMessage, setUserMessage] = useState("")
  const [showButton, setShowButton] = useState(false)
  const autoOpenTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const buttonTimer = setTimeout(() => setShowButton(true), 2000)
    autoOpenTimer.current = setTimeout(() => setIsChatOpen(true), 10000)

    return () => {
      clearTimeout(buttonTimer)
      clearTimeout(autoOpenTimer.current)
    }
  }, [])

  const closeChat = () => {
    clearTimeout(autoOpenTimer.current)
    setIsChatOpen(false)
  }

  const toggleChat = () => {
    clearTimeout(autoOpenTimer.current)
    setIsChatOpen((open) => !open)
  }

  const handleSendMessage = () => {
    const message = userMessage.trim() || "Hola, tengo una consulta sobre los productos Tender."
    window.open(`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer")
    closeChat()
    setUserMessage("")
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      handleSendMessage()
    }
  }

  return { isChatOpen, userMessage, setUserMessage, showButton, closeChat, toggleChat, handleSendMessage, handleKeyDown }
}
