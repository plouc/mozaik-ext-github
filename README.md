# Mozaïk github widgets

[![Travis CI](https://img.shields.io/travis/plouc/mozaik-ext-github.svg?style=flat-square)](https://travis-ci.org/plouc/mozaik-ext-github)

## Github Client Configuration

In order to use the Mozaïk github widgets, you should configure its **client**.
It's not required that you provide a token for authentication, but then
you'll only be able to see public repos and the rate limit will apply.

### parameters

key     | description
--------|-------------------------
`token` | *github authentication token*

### usage

```javascript
{
  //…
  api: {
    github: {
        token: 'MY_GITHUB_TOKEN'
    },
  }
}
```



## Github User badge

> Show github user badge.

![github user badge](https://raw.githubusercontent.com/plouc/mozaik-ext-github/master/preview/github.user_badge.png)

### parameters

key    | required | description
-------|----------|--------------------------
`user` | yes      | *github user identifier*

### usage

```javascript
{
  type: 'github.user_badge', user: 'plouc',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## Github Repository Contributors Stats

> Show github contributors stats.

![github repository contributors stats](https://raw.githubusercontent.com/plouc/mozaik-ext-github/master/preview/github.repository_contributors_stats.png)

### parameters

key          | required | description
-------------|----------|---------------
`repository` | yes      | *github repository*

### usage

```javascript
{
  type: 'github.repository_contributors_stats', repository: 'plouc/mozaik',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## Github Repository Branches

> Show github branches with authors.

![github repository branches](https://raw.githubusercontent.com/plouc/mozaik-ext-github/master/preview/github.branches.png)

### parameters

key          | required | description
-------------|----------|---------------
`repository` | yes      | *github repository*
`title`      | no       | *overrides default title if provided*

### usage

```javascript
{
  type: 'github.branches', repository: 'plouc/mozaik',
  columns: 1, rows: 1, x: 0, y: 0
}
```



## Github issue types treemap

> Show a treemap of issue types.

![github repository branches](https://raw.githubusercontent.com/plouc/mozaik-ext-github/master/preview/github.issue_types_treemap.png)

### parameters

key          | required | description
-------------|----------|---------------
`repository` | yes      | *github repository*
`labels`     | yes      | *a list of labels with an associated color*

### usage

```javascript
{
    type: 'github.issue_labels_treemap',
    repository: 'plouc/mozaik',
    labels: [
        { color: '#6bc2c8', count: 13, name: 'blocker'     },
        { color: '#5f8cc0', count: 3,  name: 'enhancement' },
        { color: '#525487', count: 7,  name: 'bug'         },
        { color: '#383b72', count: 16, name: 'help-wanted' }
    ],
    columns: 1, rows: 1,
    x: 0, y: 0
}
```