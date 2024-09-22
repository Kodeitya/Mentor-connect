import React, { useState, useEffect } from 'react';

const TypingEffect = () => {
  const arr = [
    'SEO', 
    'Python', 
    'Web Dev', 
    'DevOps', 
    'ML', 
    'Cloud Computing',
    'Data Science',
    'AI',
    'Cybersecurity',
    'UI/UX Design',
    'Blockchain',
    'Mobile App Development',
    'Big Data',
    'AR/VR',
    'IoT',
    'CV',
    'Career',
    'Health'
  ];
  const [currentText, setCurrentText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    // Typing speed for each character
    const typingSpeed = isDeleting ? 50 : 150;
    const nextWordDelay = 1500; // Delay before starting the next word

    const handleTyping = () => {
      const fullWord = arr[currentWordIndex];

      if (isDeleting) {
        setCurrentText(fullWord.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else {
        setCurrentText(fullWord.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }

      // Check if word typing is complete
      if (!isDeleting && charIndex === fullWord.length) {
        setTimeout(() => setIsDeleting(true), nextWordDelay); // Start deleting after a delay
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % arr.length); // Move to the next word
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentWordIndex]);

  return (
    <div className="text-6xl font-mono text-[#118577]">
      <h1><span>{currentText}</span><span className="blinking-cursor">|</span></h1>
      
    </div>
  );
};

export default TypingEffect;
