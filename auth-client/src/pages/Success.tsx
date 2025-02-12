import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export const Success = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userParam = new URLSearchParams(window.location.search).get('user');
    if (userParam) {
      try {
        setUser(JSON.parse(userParam));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        navigate('/');
      }
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
      setIsLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8"
      >
        {/* Avatar */}
        <motion.div variants={itemVariants} className="text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-blue-100">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.firstName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {user.firstName[0]}
                  </span>
                </div>
              )}
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 500, damping: 30 }}
              className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Informations utilisateur */}
        <motion.div variants={itemVariants} className="text-center mt-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {user.firstName}!
          </h1>
          <p className="mt-2 text-gray-600">{user.email}</p>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 mt-8">
          <div className="bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-blue-600 font-semibold">Session</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-green-600 font-semibold">Status</div>
            <div className="text-sm text-gray-600">Verified</div>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div variants={itemVariants} className="mt-8">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            disabled={isLoading}
            className={`w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-6 py-3 font-medium shadow-lg shadow-blue-500/30 transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}; 