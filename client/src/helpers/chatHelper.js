/**
 * Chat Helper
 * @author Binh Nguyen
 * @since 0.1.0
 */

/**
 * checks if a user is in a list
 */
exports.checkList = function(name, list) {
  for (var i = 0; i < list.length; i++) {
    if (list[i].name === name) return list[i].id;
  }
  return null;
}
