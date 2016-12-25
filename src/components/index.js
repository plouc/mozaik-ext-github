/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import Branches                    from './Branches'
import PullRequests                from './pull-requests/PullRequests'
import UserBadge                   from './badges/UserBadge'
import OrgBadge                    from './badges/OrgBadge'
import RepoBadge                   from './badges/RepoBadge'
import RepoContributorsStats       from './stats/RepoContributorsStats'
import Status                      from './Status'
import RepoTrafficViewsHistogram   from './traffic/RepoTrafficViewsHistogram'
import RepoTrafficViewsLine        from './traffic/RepoTrafficViewsLine'
import RepoTrafficClonesHistogram  from './traffic/RepoTrafficClonesHistogram'
import RepoTrafficClonesLine       from './traffic/RepoTrafficClonesLine'
import RepoCommitActivityHistogram from './stats/RepoCommitActivityHistogram'
import RepoCommitActivityLine      from './stats/RepoCommitActivityLine'


export default {
    Branches,
    PullRequests,
    UserBadge,
    OrgBadge,
    RepoBadge,
    RepoContributorsStats,
    Status,
    RepoTrafficViewsHistogram,
    RepoTrafficViewsLine,
    RepoTrafficClonesHistogram,
    RepoTrafficClonesLine,
    RepoCommitActivityHistogram,
    RepoCommitActivityLine,
}
