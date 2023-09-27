module.exports = {
    extends: [
      'plugin:@typescript-eslint/recommended', // TypeScript rules
      'plugin:react-hooks/recommended', // React hooks rules
    ],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "react-hooks/exhaustive-deps": "warn",
      // Add any other rules you want to modify here
    },
  };
  