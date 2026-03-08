/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} email
 * @property {string} display_name
 * @property {string} [avatar_url]
 * @property {"email"|"apple"|"google"} provider
 * @property {string} [provider_id]
 * @property {string} created_at
 */

/**
 * @typedef {Object} Note
 * @property {string} pitch       - e.g. "C4", "D#5"
 * @property {number} duration    - in beats
 * @property {number} startBeat
 */

/**
 * @typedef {Object} Level
 * @property {string}   id
 * @property {number}   level_number
 * @property {string}   title
 * @property {string}   composer
 * @property {string}   [image_url]
 * @property {number}   bpm
 * @property {1|2|3|4|5} difficulty
 * @property {number}   time_limit_seconds
 * @property {Note[]}   piece
 * @property {string[]} description
 * @property {string}   success_text
 * @property {string}   [source]
 * @property {string}   created_at
 */

/**
 * @typedef {Object} Progress
 * @property {string}  id
 * @property {string}  user_id
 * @property {string}  level_id
 * @property {boolean} completed
 * @property {boolean} perfect
 * @property {number}  best_score
 * @property {number}  attempts
 * @property {string}  last_played_at
 */

/**
 * @typedef {Object} Score
 * @property {string} id
 * @property {string} user_id
 * @property {string} level_id
 * @property {number} score
 * @property {number} combo_max
 * @property {number} accuracy
 * @property {string} played_at
 */

// No runtime exports — import this file for JSDoc type hints only.
module.exports = {};
