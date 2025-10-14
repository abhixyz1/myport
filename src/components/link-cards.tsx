"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface LinkCardProps {
  href: string;
  title: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  delay: number;
  isVisible: boolean;
}

const LinkCard: React.FC<LinkCardProps> = ({ href, title, Icon, delay, isVisible }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: delay / 1000 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:from-purple-500 group-hover:to-blue-600 transition-all duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-gray-500">Click to connect</p>
        </div>
      </div>
    </motion.a>
  );
};

export default LinkCard;