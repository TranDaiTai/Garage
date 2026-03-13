import { useEffect, useState, useCallback } from "react"
import { decorationThemes, getCurrentSeasonTheme } from "@/lib/decorations"

export function SeasonalDecoration() {
  const [currentTheme, setCurrentTheme] = useState(null)
  const [particles, setParticles] = useState([])
  const [mounted, setMounted] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handleMotionChange = (e) => {
      setIsReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleMotionChange)

    const initializeTheme = () => {
      const storedTheme = localStorage.getItem("decorationTheme") || getCurrentSeasonTheme()
      const config = decorationThemes[storedTheme] || decorationThemes.default
    //   console.log("Loading theme:", storedTheme, config)
      setCurrentTheme(config)

      if (config.enabled && config.particles && !isReducedMotion) {
        const newParticles = []
        let id = 0

        config.particles.forEach((particle) => {
          for (let i = 0; i < particle.count; i++) {
            const speedMap = {
              slow: Math.random() * 10 + 15,
              medium: Math.random() * 8 + 10,
              fast: Math.random() * 5 + 6,
            }

            const sizeMap = {
              small: "text-xl",
              medium: "text-2xl",
              large: "text-3xl",
              xl: "text-4xl",
            }

            newParticles.push({
              id: id++,
              emoji: particle.emoji,
              left: Math.random() * 100,
              duration: speedMap[particle.speed],
              delay: Math.random() * 10,
              size: sizeMap[particle.size] || "text-2xl",
            })
          }
        })

        setParticles(newParticles)
      } else {
        setParticles([])
      }
    }

    initializeTheme()

    const handleStorageChange = () => {
      initializeTheme()
    }

    const handleThemeChange = () => {
      initializeTheme()
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("decorationThemeChange", handleThemeChange)
    
    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("decorationThemeChange", handleThemeChange)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [isReducedMotion])

  const getCornerAnimation = useCallback((index) => {
    if (isReducedMotion) return ""
    
    const animations = ["bounce", "pulse", "bounce", "pulse"]
    return `animate-${animations[index % animations.length]}`
  }, [isReducedMotion])

  if (!mounted || !currentTheme || !currentTheme.enabled) {
    return null
  }

//   console.log("Rendering theme:", currentTheme)

 const cornerEmojis = currentTheme.cornerElements?.map(item => item.emoji) || []
const edgeEmojis = currentTheme.edgeElements?.map(item => item.emoji) || []



  return (
    <>
      {/* Background gradient - FIXED: Sử dụng background thay vì gradient nếu cần */}
{/* 
.login-page {
  @apply min-h-screen flex items-center justify-center p-4;
  background-image: url('/gradient-background.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
} */}

      {/* { !currentTheme.backgroundColor && (
         <div
          className={`fixed inset-0 pointer-events-none bg-gradient-to-b ${currentTheme.backgroundColor} -z-1 `}
          style={{ 
            opacity: 1,
            backgroundImage: "url('/gradient-background.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
      )
      } */}


      {currentTheme.backgroundColor && (
        <div
          className={`fixed inset-0 pointer-events-none bg-gradient-to-b ${currentTheme.backgroundColor} -z-1 `}
          style={{ 
            opacity: 1,
          }}
        />
        
      )}

      {/* Corner decorations */}

      {cornerEmojis.length >= 4 && (
        <>
          {/* Top-left corner */}
          {/* <div className="fixed top-0 left-0 pointer-events-none z-99 opacity-80">
            <div className="text-4xl md:text-6xl flex flex-col gap-3 p-4">
              {cornerEmojis.slice(0, 2).map((emoji, i) => (
                <div 
                  key={`tl-${i}`} 
                  className={getCornerAnimation(i)}
                  style={{ 
                    animationDelay: `${i * 0.7}s`,
                    animationDuration: '2s'
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div> */}

          {/* Top-right corner */}
          {/* <div className="fixed top-0 right-0 pointer-events-none z-99 opacity-80">
            <div className="text-4xl md:text-6xl flex flex-col gap-3 p-4">
              {cornerEmojis.slice(2, 4).map((emoji, i) => (
                <div 
                  key={`tr-${i}`} 
                  className={getCornerAnimation(i + 2)}
                  style={{ 
                    animationDelay: `${(i + 2) * 0.7}s`,
                    animationDuration: '2s'
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div> */}

          {/* Bottom-left corner */}
          {/* <div className="fixed bottom-0 left-0 pointer-events-none z-20 opacity-80">
            <div className="text-4xl md:text-6xl flex flex-col-reverse gap-3 p-4">
              {cornerEmojis.slice(0, 2).map((emoji, i) => (
                <div 
                  key={`bl-${i}`} 
                  className={getCornerAnimation(i)}
                  style={{ 
                    animationDelay: `${i * 0.7}s`,
                    animationDuration: '2s'
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div> */}

          {/* Bottom-right corner */}
          {/* <div className="fixed bottom-0 right-0 pointer-events-none z-20 opacity-80">
            <div className="text-4xl md:text-6xl flex flex-col-reverse gap-3 p-4">
              {cornerEmojis.slice(2, 4).map((emoji, i) => (
                <div 
                  key={`br-${i}`} 
                  className={getCornerAnimation(i + 2)}
                  style={{ 
                    animationDelay: `${(i + 2) * 0.7}s`,
                    animationDuration: '2s'
                  }}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div> */}
        </>
      )}

      {/* Top edge decoration */}
      {/* {edgeEmojis.length > 0 && (
        <div className="fixed top-2 left-1/2 -translate-x-1/2 pointer-events-none z-0 opacity-70">
          <div className="text-2xl md:text-3xl flex gap-4 md:gap-6">
            {edgeEmojis.map((emoji, i) => (
              <div 
                key={`edge-${i}`} 
                className={isReducedMotion ? "" : "animate-pulse"}
                style={{ 
                  animationDelay: `${i * 0.4}s`,
                  animationDuration: '2.5s'
                }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      )} */}

      {/* Falling particles */}
      {!isReducedMotion && particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden ">
          {particles.map((particle) => (
            <div
              key={particle.id}
              className={`absolute ${particle.size} select-none pointer-events-none`}
              style={{
                left: `${particle.left}%`,
                top: '-50px',
                animation: `fall ${particle.duration}s linear ${particle.delay}s infinite`,
                opacity: particle.opacity,
              }}
            >
              {particle.emoji}
            </div>
          ))}
        </div>
      )}

      <style >{`
        @keyframes fall {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </>
  )
}

export function DecorationThemeSwitcher() {
  const [activeTheme, setActiveTheme] = useState("default")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("decorationTheme") || getCurrentSeasonTheme()
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveTheme(stored)
  }, [])

  const handleThemeChange = (theme) => {
    localStorage.setItem("decorationTheme", theme)
    setActiveTheme(theme)
    window.dispatchEvent(new Event('decorationThemeChange'))
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleVisibility}
        className="p-3 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        aria-label="Toggle decoration themes"
      >
        <span className="text-xl">🎨</span>
      </button>

      {isVisible && (
        <div className="absolute bottom-14 right-0 w-64 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-gray-800">Seasonal Decorations</p>
            <button
              onClick={toggleVisibility}
              className="text-gray-500 hover:text-gray-700 text-lg"
            >
              ×
            </button>
          </div>
          
          <div className="flex flex-col gap-2 mb-3 max-h-60 overflow-y-auto">
            {Object.keys(decorationThemes).map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`px-3 py-2 text-sm rounded-lg transition-all flex items-center gap-3 ${
                  activeTheme === theme
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="text-base">
                  {decorationThemes[theme].emoji || "🎨"}
                </span>
                <span className="flex-1 text-left">{decorationThemes[theme].name}</span>
                {activeTheme === theme && (
                  <span className="text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
          
          <div className="text-xs text-gray-500 border-t pt-2">
            <p>Current: {decorationThemes[activeTheme]?.name || "Default"}</p>
            {activeTheme === "default" && (
              <p className="text-orange-600 mt-1">
                Auto: {decorationThemes[getCurrentSeasonTheme()]?.name}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}