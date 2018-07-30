'use strict'

module.exports = (Mozaik, configFile, config) => {
    Mozaik.registerApi('github', require('@mozaik/ext-github/client'))
}
