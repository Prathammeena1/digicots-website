import React, { useState, useEffect } from 'react'
import './AboutSeventhSection.css'

const AboutSeventhSection = () => {
  const [hoveredOption, setHoveredOption] = useState(0) // Default first option active
  const [isHovering, setIsHovering] = useState(false) // Track if user is hovering
  const [autoActiveOption, setAutoActiveOption] = useState(0) // For auto cycling
  const [progress, setProgress] = useState(0) // Progress of current timer

  const optionsData = [
    {
      id: 0,
      background: 'url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg)',
      icon: '🚶',
      main: 'Web Development',
      sub: 'Custom websites & applications'
    },
    {
      id: 1,
      background: 'url(https://66.media.tumblr.com/8b69cdde47aa952e4176b4200052abf4/tumblr_o51p7mFFF21qho82wo1_1280.jpg)',
      icon: '❄️',
      main: 'UI/UX Design',
      sub: 'Beautiful & intuitive interfaces'
    },
    {
        id: 2,
        background: 'url(https://66.media.tumblr.com/5af3f8303456e376ceda1517553ba786/tumblr_o4986gakjh1qho82wo1_1280.jpg)',
        icon: '🌳',
        main: 'Mobile Apps',
        sub: 'iOS & Android development'
    },
    {
        id: 3,
        background: 'url(https://66.media.tumblr.com/5516a22e0cdacaa85311ec3f8fd1e9ef/tumblr_o45jwvdsL11qho82wo1_1280.jpg)',
        icon: '💧',
        main: 'Digital Marketing',
        sub: 'SEO & social media growth'
    },
    {
        id: 4,
        background: 'url(https://66.media.tumblr.com/f19901f50b79604839ca761cd6d74748/tumblr_o65rohhkQL1qho82wo1_1280.jpg)',
        icon: '☀️',
        main: 'Brand Identity',
        sub: 'Logo & visual identity design'
    },
    {
        id: 5,
        background: 'url(https://66.media.tumblr.com/6fb397d822f4f9f4596dff2085b18f2e/tumblr_nzsvb4p6xS1qho82wo1_1280.jpg)',
        icon: '🚶',
        main: 'Web Development',
        sub: 'Custom websites & applications'
    }
  ]

  const defaultColors = ['#ED5565', '#FC6E51', '#FFCE54', '#2ECC71', '#5D9CEC', '#AC92EC']

  // Auto cycling effect
  useEffect(() => {
    let interval = null;
    let progressInterval = null;
    
    if (!isHovering) {
      setProgress(0); // Reset progress when starting
      
      // Progress bar update every 50ms
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) return 0;
          return prev + (100 / (3000 / 50)); // 100% over 3 seconds
        });
      }, 50);
      
      // Option change every 3 seconds
      interval = setInterval(() => {
        setAutoActiveOption((prev) => (prev + 1) % optionsData.length)
        setProgress(0); // Reset progress when changing option
      }, 3000);
    } else {
      setProgress(0); // Reset progress when hovering
    }

    return () => {
      if (interval) clearInterval(interval);
      if (progressInterval) clearInterval(progressInterval);
    }
  }, [isHovering, optionsData.length, autoActiveOption])

  const handleOptionHover = (optionId) => {
    setHoveredOption(optionId)
    setIsHovering(true)
  }

  const handleOptionsEnter = () => {
    setIsHovering(true)
  }

  const handleOptionsLeave = () => {
    setIsHovering(false)
    setHoveredOption(0) // Reset to first option
  }

  // Get the currently active option (either hovered or auto)
  const currentActiveOption = isHovering ? hoveredOption : autoActiveOption

  return (
    <div className="about-seventh-section">

        <div className=''>
            <h1 className="text-center text-7xl font-semibold">Our Services</h1>
        </div>

      <div className="options pointer-events-auto" onMouseEnter={handleOptionsEnter} onMouseLeave={handleOptionsLeave}>
        {optionsData.map((option, index) => (
          <div
            key={option.id}
            className={`option ${currentActiveOption === option.id ? 'active' : ''}`}
            style={{
              '--optionBackground': option.background,
              '--defaultBackground': defaultColors[index % defaultColors.length]
            }}
            onMouseEnter={() => handleOptionHover(option.id)}
          >
            <div className="shadow"></div>
            <div className="label">
              <div className="icon">
                <span>{option.icon}</span>
              </div>
              <div className="info">
                <div className="main">{option.main}</div>
                <div className="sub">{option.sub}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress Indicators */}
      <div className="progress-indicators">
        {optionsData.map((option, index) => (
          <div
            key={`indicator-${option.id}`}
            className={`progress-dot ${currentActiveOption === option.id ? 'active' : ''}`}
            onClick={() => {
              if (isHovering) {
                setHoveredOption(option.id);
              } else {
                setAutoActiveOption(option.id);
                setProgress(0);
              }
            }}
          >
            {currentActiveOption === option.id && !isHovering && (
              <div 
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AboutSeventhSection