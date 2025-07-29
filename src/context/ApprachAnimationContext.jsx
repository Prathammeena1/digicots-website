import React, { createContext, useContext, useRef } from 'react'

const ApproachAnimationContext = createContext()

export const useApproachAnimation = () => {
  const context = useContext(ApproachAnimationContext)
  if (!context) {
    throw new Error('useApproachAnimation must be used within an ApproachAnimationProvider')
  }
  return context
}

export const ApproachAnimationProvider = ({ children }) => {
  const screen1Ref = useRef(null)
  const screen2Ref = useRef(null)

  const value = {
    screen1Ref,
    screen2Ref
  }

  return (
    <ApproachAnimationContext.Provider value={value}>
      {children}
    </ApproachAnimationContext.Provider>
  )
}

export default ApproachAnimationContext