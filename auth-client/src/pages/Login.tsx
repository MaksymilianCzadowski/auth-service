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

  const handleGithubLogin = () => {
    setIsLoading('github');
    window.location.href = 'http://localhost:3000/auth/github';
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

          {/* Bouton GitHub */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleGithubLogin}
            disabled={!!isLoading}
            className={`w-full flex items-center justify-center gap-3 bg-gray-800 rounded-xl px-6 py-4 text-white shadow-lg hover:shadow-xl transition-all duration-200 ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {isLoading === 'github' ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                <span className="font-medium">Continue with GitHub</span>
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