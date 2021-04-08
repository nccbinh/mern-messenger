/**
 * API Helper
 * @author Binh Nguyen
 * @since 0.1.0
 */

/**
 * handles response for APIs that require authentication
 */
export default function handleResponse(response) {
  return response.text().then((text) => {
    if (!response.ok) {
      if ([401, 403].indexOf(response.status) !== -1) {
        // signs out if 401 Unauthorized or 403 Forbidden response returned from api
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } else {
      const data = text && JSON.parse(text);
      return data;
    }
  });
}
