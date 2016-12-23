# Mozaïk GitHub widgets

[![License][license-image]][license-url]
[![Travis CI][travis-image]][travis-url]
[![NPM version][npm-image]][npm-url]
[![Dependencies][gemnasium-image]][gemnasium-url]
[![Coverage Status][coverage-image]][coverage-url]
![widget count][widget-count-image]

[![Deploy][heroku-image]][heroku-url]

This repository contains some GitHub widgets to use with [Mozaïk](https://github.com/plouc/mozaik).

## Demo

You can see a live demo of the widgets [here](http://mozaik-github.herokuapp.com/)

## Widgets

- [`<UserBadge />`](#userbadge)
- [`<OrganizationBadge />`](#orgbadge)
- [`<RepoBadge />`](#repobadge)
- [`<Status />`](#status)
- [`<Branches />`](#branches)
- [`<PullRequests />`](#pullrequests)
- [`<RepoContributorsStats />`](#repocontributorsstats)
- [`<RepoTrafficClonesHistogram />`](#repotrafficcloneshistogram)
- [`<RepoTrafficClonesLine />`](#repotrafficclonesline)
- [`<RepoTrafficViewsHistogram />`](#repotrafficviewshistogram)
- [`<RepoTrafficViewsLine />`](#repotrafficviewsline)
- [`<RepoCommitActivityHistogram />`](#repocommitactivityhistogram)
- [`<RepoCommitActivityLine />`](#repocommitactivityline)

## Github Client Configuration

In order to use the Mozaïk github widgets, you should configure its **client**.
It's not required that you provide a token for authentication, but then
you'll only be able to see public repos and the rate limit will apply.

### parameters

key       | env key          | required | default                | description
----------|------------------|----------|------------------------|----------------------------
`token`   | GITHUB_API_TOKEN | no       | ''                     | *github authentication token*
`baseUrl` | GITHUB_BASE_URL  | no       | https://api.github.com | *github api url* (useful for enterprise)

### usage

``` yaml
//…
api:
  github:
    baseUrl: ""
    token:   MY_GITHUB_TOKEN
```

## Widgets doc



### UserBadge

> Show github user badge.

![github user badge](https://raw.githubusercontent.com/plouc/mozaik-ext-github/master/preview/github.user_badge.png)

#### parameters

key    | required | description
-------|----------|--------------------------
`user` | yes      | *github user identifier*

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension: github
    widget:    UserBadge
    user:      plouc
    columns:   1
    rows:      1
    x:         0
    y:         0
```



### OrgBadge

> Show github organization badge.

![github organization badge](https://raw.githubusercontent.com/plouc/mozaik-ext-github/master/preview/github.organization_badge.png)

#### parameters

key    | required | description
-------|----------|--------------------------
`org` | yes      | *github organization identifier*

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension:    github
    widget:       OrgBadge
    organization: github
    columns:      1
    rows:         1
    x:            0
    y:            0
```



### Status

> Shows the latest Github system status information from [https://status.github.com/](https://status.github.com/)

![Github Status](https://raw.githubusercontent.com/plouc/mozaik-ext-github/master/preview/github.status.png)

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension: github
    widget:    Status
    columns:   1
    rows:      1
    x:         0
    y:         0
```



### Branches

> Show github branches with authors.

![github repository branches](https://raw.githubusercontent.com/plouc/mozaik-ext-github/master/preview/github.branches.png)

#### parameters

key          | required | description
-------------|----------|---------------
`repository` | yes      | *github repository*
`title`      | no       | *overrides default title if provided*

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension:  github
    widget:     Branches
    repository: plouc/mozaik
    columns:    1
    rows:       1
    x:          0
    y:          0
```



### PullRequests

> Show github repository pull requests with authors.

#### parameters

key          | required | description
-------------|----------|---------------
`repository` | yes      | *github repository*
`title`      | no       | *overrides default title if provided*

#### usage

``` yaml
# config.yml
dashboards:
- # …
  widgets:
  - extension:  github
    widget:     PullRequests
    repository: plouc/mozaik
    columns:    1
    rows:       1
    x:          0
    y:          0
```



[license-image]: https://img.shields.io/github/license/plouc/mozaik-ext-github.svg?style=flat-square
[license-url]: https://github.com/plouc/mozaik-ext-github/blob/master/LICENSE.md
[travis-image]: https://img.shields.io/travis/plouc/mozaik-ext-github.svg?style=flat-square
[travis-url]: https://travis-ci.org/plouc/mozaik-ext-github
[npm-image]: https://img.shields.io/npm/v/mozaik-ext-github.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/mozaik-ext-github
[gemnasium-image]: https://img.shields.io/gemnasium/plouc/mozaik-ext-github.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/plouc/mozaik-ext-github
[coverage-image]: https://img.shields.io/coveralls/plouc/mozaik-ext-github.svg?style=flat-square
[coverage-url]: https://coveralls.io/github/plouc/mozaik-ext-github
[widget-count-image]: https://img.shields.io/badge/widgets-x13-green.svg?style=flat-square
[heroku-image]: https://www.herokucdn.com/deploy/button.svg
[heroku-url]: https://heroku.com/deploy?template=https://github.com/plouc/mozaik-ext-github/tree/demo