/**
 * Authentication Helper
 * @author Binh Nguyen
 * @since 0.0.1
 */
 const jwt = require("jsonwebtoken");
 
/**
 * @name getPayload
 * @description extracts payload from cookie
 * @param {string} cookie
 * @returns payload from token
 */
exports.getPayload = (cookie) => {
  if (!cookie) return null;
  // gets token from cookie
  const token = cookie.replace(process.env.JWT_PARAM + "=", "");
  // decodes token
  return jwt.verify(token, process.env.JWT_SECRET);
};
