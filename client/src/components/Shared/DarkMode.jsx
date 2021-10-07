import React, {useEffect, useState} from 'react'

export const useDarkMode = () => {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

  const setMode = mode => {
    window.localStraoge.setItem('theme', mode)
    setTheme(mode)
  }

const toggleMode = () => {
  if (theme === 'light') {
    setMode('dark')
  } else {
    setMode('light')
  }
}

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
    setMode('dark') :
    localTheme ?
      setTheme(localTheme) :
      setMode('light')
    setMounted(true)
  }, [])


return [theme, toggleMode, mounted]


}