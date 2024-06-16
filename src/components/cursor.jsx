import { React, useEffect } from 'react'
import gsap from 'gsap'
import { useLayoutEffect } from 'react'
import { useRef } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef()

  useLayoutEffect(() => {
    const cursor = cursorRef.current
    const followMouse = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        ease: "back.out"
      })
    }

    window.addEventListener("mousemove", followMouse)

    return () => {
      window.removeEventListener("mousemove", followMouse)
    }
  }, [])

  return <div ref={cursorRef} className="cursor"></div>
}

export default CustomCursor