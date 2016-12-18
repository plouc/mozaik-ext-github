/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
'use strict'

import Branches                    from './Branches'
import PullRequests                from './pull-requests/PullRequests'
import UserBadge                   from './UserBadge'
import OrganizationBadge           from './OrganizationBadge'
import RepositoryContributorsStats from './RepositoryContributorsStats'
import Status                      from './Status'
import TopCommitter                from './TopCommitter'
import TrafficViewsLine            from './traffic/TrafficViewsLine'
import TrafficViewsBar             from './traffic/TrafficViewsBar'
//import IssueLabelsTreemap          from './IssueLabelsTreemap'
//import PullRequestsGauge           from './PullRequestsGauge'
//import IssueLabelsDonut            from './IssueLabelsDonut'
//import ParticipationStats          from './ParticipationStats'
//import RepositoryLanguages         from './RepositoryLanguages'


export default {
    Branches,
    PullRequests,
    UserBadge,
    OrganizationBadge,
    RepositoryContributorsStats,
    Status,
    TopCommitter,
    TrafficViewsLine,
    TrafficViewsBar,
    // For now those widgets are not stable enough
    // some of them involve heavy API calls
    // which leads to unreliable results
    //PullRequestsGauge,
    //IssueLabelsTreemap,
    //IssueLabelsDonut,
    //ParticipationStats,
    //RepositoryLanguages
}
