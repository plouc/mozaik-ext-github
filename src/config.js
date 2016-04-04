import convict from 'convict';


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
});


export default config;
