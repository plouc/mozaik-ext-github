/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

const convict = require('convict')


const config = convict({
    github: {
        baseUrl: {
            doc:     'The github API base url.',
            default: 'https://api.github.com',
            format:  String,
            env:     'GITHUB_BASE_URL'
        },
        token: {
            doc:     'The github API token.',
            default: '',
            format:  String,
            env:     'GITHUB_API_TOKEN'
        }
    }
})


module.exports = config
