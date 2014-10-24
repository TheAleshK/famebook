/* Global object */

define(function(require, exports, module) {
    /**
     * A singleton that maintains a global registry of Surfaces.
     *   Private.
     *
     * @private
     * @static
     * @class Entity
     */

    var properties = {};

    /**
     * Get entity from global index.
     *
     * @private
     * @method get
     * @param {Number} id entity registration id
     * @return {Surface} entity in the global index
     */
    function get(key) {
        return properties[key];
    }

    /**
     * Overwrite entity in the global index
     *
     * @private
     * @method set
     * @param {Number} id entity registration id
     * @return {Surface} entity to add to the global index
     */
    function set(key, value) {
        properties[key] = value;
    }

    /**
     * Remove entity from global index
     *
     * @private
     * @method unregister
     * @param {Number} id entity registration id
     */
    function unregister(id) {
        set(id, null);
    }

    module.exports = {
        unregister: unregister,
        get: get,
        set: set,
        properties: properties
    };
});