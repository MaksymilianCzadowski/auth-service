import { useState } from 'react';
import { motion } from 'framer-motion';

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

export const Login = () => {
  const googleLogo = "https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg";
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleGoogleLogin = () => {
    setIsLoading('google');
    window.location.href = 'http://localhost:3000/auth/google?prompt=select_account';
  };

  const handleOpenIDLogin = () => {
    setIsLoading('openid');
    window.location.href = 'http://localhost:3000/auth/openid?prompt=login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        {/* Logo et titre */}
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="inline-block p-2 bg-white rounded-2xl shadow-xl mb-4">
            <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to continue to your account</p>
        </motion.div>

        {/* Boutons de connexion */}
        <motion.div variants={itemVariants} className="space-y-4">
          {/* Bouton Google */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGoogleLogin}
            disabled={!!isLoading}
            className={`w-full flex items-center justify-center gap-3 bg-white rounded-xl px-6 py-4 text-gray-700 shadow-lg hover:shadow-xl transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading === 'google' ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
            ) : (
              <>
                <img src={googleLogo} alt="Google" className="w-6 h-6" />
                <span className="font-medium">Continue with Google</span>
              </>
            )}
          </motion.button>

          {/* Bouton OpenID */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenIDLogin}
            disabled={!!isLoading}
            className={`w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl px-6 py-4 text-white shadow-lg hover:shadow-xl transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading === 'openid' ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="font-medium">Continue with OpenID</span>
              </>
            )}
          </motion.button>
        </motion.div>

        {/* Footer */}
        <motion.p variants={itemVariants} className="mt-8 text-center text-sm text-gray-500">
          By continuing, you agree to our{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">Terms of Service</a>
          {' '}and{' '}
          <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">Privacy Policy</a>
        </motion.p>
      </motion.div>
    </div>
  );
}; 