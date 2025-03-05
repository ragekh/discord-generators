import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * AnimatedElement component for adding animations to any element
 * Uses framer-motion for animations and react-intersection-observer for triggering
 * 
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child elements to animate
 * @param {string} props.animation Animation type: 'fade', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'bounce'
 * @param {number} props.duration Animation duration in seconds
 * @param {number} props.delay Animation delay in seconds
 * @param {string} props.className Additional CSS classes
 * @param {Object} props.style Additional inline styles
 * @param {string} props.as HTML element type to render
 * @param {boolean} props.once Only animate once when entering viewport
 * @param {number} props.threshold Intersection observer threshold (0-1)
 * @returns {JSX.Element} Animated component
 */
const AnimatedElement = ({
  children,
  animation = 'fade',
  duration = 0.5,
  delay = 0,
  className = '',
  style = {},
  as = 'div',
  once = true,
  threshold = 0.1,
  ...props
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold: threshold,
  });

  // Animation variants
  const variants = {
    hidden: {
      opacity: 0,
      y: animation === 'slide-up' ? 20 : animation === 'slide-down' ? -20 : 0,
      x: animation === 'slide-left' ? 20 : animation === 'slide-right' ? -20 : 0,
      scale: animation === 'scale' ? 0.95 : 1,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      transition: {
        duration: duration,
        delay: delay,
        ease: animation === 'bounce' ? 'backOut' : 'easeOut',
      },
    },
  };

  // Start animation when element comes into view
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, inView, once]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
      style={style}
      as={as}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedElement;