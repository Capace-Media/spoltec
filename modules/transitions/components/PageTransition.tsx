import { ReactChild } from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: ReactChild;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
