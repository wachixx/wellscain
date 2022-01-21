![logo](./src/logo-grey.png)

# Senior Software Engineer - Webapp - Hiring Project

## Athenian Webapp project instructions

The project consists of building a single-page application with charts consuming real data from the Athenian API using the endpoint provided.

We recommend skimming through all instruction sections at least once to get the full picture before getting started.

### How to submit your solution

Fork this repository without identifying Athenian (need inspiration? use a [codename generator](https://www.imprima.com/projectnamegenerator/)), and eventually provide comments and considerations about your solution.

## Project Requirements

- The project is a single page application written in ReactJS.
- The SPA is implemented using ReactJS hooks, and not classes.
- Styling is implemented using CSS-in-JS (EmotionJS)
- You’re free to use whatever library you need (e.g. for the date filter, for the tab manager, for routing, for data manipulation, etc.)
- The deliverable must be a Dockerfile with the documentation on how to run it
- The source code is available.

We expect that the project not only works, but takes into account UI and UX aspects; improvements on this regard are encouraged.

## What you will build

This repository contains the skeleton of single-page application. It consists of a React SPA written in Javascript created with CRA and with EmotionJS already configured, but you're free to use any other CSS-in-JS library you prefer.

The skeleton has screenshots from our product (available at https://app.athenian.co/demo) just to illustrate an idea of how the application could be structured. The final single-page application will contain different charts showing metrics relataed to Athenian's most active repositories. The data will come by querying Athenian's API (see the next section to know more about Athenian API) for the following Athenian's repositories:
- `"github.com/athenianco/athenian-api"`,
- `"github.com/athenianco/athenian-webapp"`,
- `"github.com/athenianco/infrastructure"`,
- `"github.com/athenianco/metadata"`.

As explained in next section, the `account` is set to `1` and we also want the parameter `exclude_inactive` to be set to `true`.

We'd like to see a dashboard with the following structure:
- a date filter to change the date range,
- a dynamic set of tabs each with two charts, and as a bonus, two KPI boxes.

The skeleton implements this structure to make it clearer:
![skeleton](./skeleton-screen.png)

The deliverable must be a Docker container with a documentation on how to run it.

### Date filter

The date range has to be limited to at most 3 months of data.

### Insights

The page starts as empty, and there shuld be an "Add" button. This button enables the user to add another tab. The tab contains two charts:
- a timeseries showing how the metric evolves over time + a horizontal line showing the average,
- a histogram where the metric is grouped by repository.

Each tab can also be removed with an "X" button.

See the screenshot in the skeleton.

The metrics that can be selected are:
- `pr-wip-time`,
- `pr-wip-count`,
- `pr-review-time`,
- `pr-review-count`,
- `pr-merging-time`,
- `pr-merging-count`,
- `pr-release-time`,
- `pr-release-count`,
- `pr-lead-time`,
- `pr-lead-count`,
- `pr-cycle-time`,
- `pr-cycle-count`,
- `pr-opened`,
- `pr-reviewed`,
- `pr-not-reviewed`,
- `pr-merged`,
- `pr-rejected`,
- `pr-closed`,
- `pr-done`.

How the metrics are chosen when the "Add" button is clicked is left to the user (e.g. with a modal, a dropdown select, etc.).

The selected metrics shuold be persisted so that if the page is refreshed, the same insights previously selected are loaded.

### Tooltips

Add informative tooltips wherever you think would be valuable to make the charts more interactive and user-friendly.

### Docker container

The SPA has to be running in a Docker container.

### Bonus points

- Add some basic skeleton design or spinner during the loading of the charts.
- Below the first chart there should be also a KPI box showing the average of the timeseries, and below the second chart a KPI box showing the average per repository. See the screenshot in the skeleton.

## Background on Athenian API

The Athenian API exposes many endpoints. All of them require a user to be authenticated so that the metrics returned are limited to the repositories of the organization the user is part of. But for demo purposes, it’s possible to query these endpoints without being authenticated, and those will return the real data for the Athenian Github organization (https://github.com/athenianco/).

You can see the demo at this link: https://app.athenian.co/demo.

For this project, we ask you to focus on a single endpoint that returns GitHub pull request metrics. The endpoint is the following: https://api.athenian.co/v1/metrics/pull_requests. The full documentation of this endpoint is available here: https://api.athenian.co/v1/ui/#/metrics/calc_metrics_prs.

The full spec is defined using OpenAPI (https://swagger.io/specification/) and is available here: https://api.athenian.co/v1/openapi.json.

This endpoint has many powerful features, but for this project, we’ll limit them to the following:
- `date_from`,
- `date_to`,
- `granularities`,
- `account`,
- `metrics`,
- `timezone`,
- `exclude_inactive`,
- `for.repositories`,
- `for.repogroups`.

The first two fields (`date_from` and `date_to`) simply define the time range we’re interested in querying.

The `granularities` field defines according to which time-scale the metrics are aggregated (e.g., “day” or “week,” see the documentation for the full list of values supported).

The `account` is the id of the account. In this case, it needs to be hardcoded to 1, which corresponds to the Athenian account.

The `metrics` is a list of metrics we want to fetch (more on this in the next section).

The `timezone` is simply the offset in minutes from UTC.

The `exclude_inactive` is a flag that indicates whether pull requests without events occurring in the date range provided should be excluded or not.

The last two fields define to which repositories the metrics are to be calculated. The `for.repositories` field is a list of repositories, let’s say `[“github.com/athenianco/repo-a”, “github.com/athenianco/repo-b”, “github.com/athenianco/repo-c”]`. If `for.repogroups` is not set, then the returned metrics will correspond to all those repositories’ overall metrics. If you make `for.repogroups` equal to `[[0], [1], [2]]` then you’ll have all the metrics divided into three different groups:
- the first group with the metrics for the repo with index `0` in `for.repositories`, hence for the `“github.com/athenianco/repo-a”` repository,
- the first group with the metrics for the repo with index `1` in `for.repositories`, hence for the `“github.com/athenianco/repo-b”` repository,
- the first group with the metrics for the repo with index `2` in `for.repositories`, hence for the `“github.com/athenianco/repo-c”` repository.

### Example queries with fetch

1. Query the Review Time and the number of PRs created for a set of repositories, with a daily granularity, from 2020-06-01 till 2020-09-01

```
fetch("https://api.athenian.co/v1/metrics/pull_requests", {
  "body": JSON.stringify({
    "for":[
      {"repositories":["github.com/athenianco/athenian-api",
                       "github.com/athenianco/athenian-webapp",
                       "github.com/athenianco/infrastructure",
                       "github.com/athenianco/metadata"]}
    ],
    "metrics":["pr-review-time","pr-opened"],
    "date_from":"2020-06-01",
    "date_to":"2020-09-01",
    "granularities":["day"],
    "exclude_inactive":true,
    "account":1,
    "timezone":60
  }),
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});
```

The response will contain the metrics in `calculated`. In this case, there’s only a single item in `calculated`, and each item in `calculated.0.values` is a data point according to the granularity. Those correspond to the requested metrics’ values: the first value corresponds to the first metric, the second value corresponds to the second metric, etc.

Let’s say that for example the JSON response of the fetch is something like the following (some keys have been omitted):

```
{
  "calculated": [
  "for": [...],
  "granularity": "day",
  "values": [
    {"date": "2020-06-01", "values": ["4000s", 10], ...},
    {"date": "2020-06-02", "values": ["5000s", 20], ...},
    ...
  ]
 ],
 ...,
 "metrics": ["pr-review-time","pr-opened"]
}
```

This means that on the 1st of June there have been 10 opened PRs (`pr-opened`) and a review time (`pr-review-time`) of 4000 seconds and on the 2nd of Juned there have been 20 opened PRs and a review time of 5000 seconds.

2. Query the Review Time and the number of PRs created for a set of repositories broken by repositories with a daily granularity, from 2020-06-01 till 2020-09-01

```
fetch("https://api.athenian.co/v1/metrics/pull_requests", {
  "body": JSON.stringify({
    "for":[
      {"repositories":["github.com/athenianco/athenian-api",
                       "github.com/athenianco/athenian-webapp",
                       "github.com/athenianco/infrastructure",
                       "github.com/athenianco/metadata"],
       "repogroups":[[0],[1],[2],[3]]}
    ],
    "metrics":["pr-review-time","pr-opened"],
    "date_from":"2020-06-01",
    "date_to":"2020-09-01",
    "granularities":["day"],
    "exclude_inactive":true,
    "account":1,
    "timezone":60
  }),
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
});
```

In this other case, there will be many items in `calculated`. The first item corresponds to the metrics of the first repository. The second item corresponds to the metrics of the second repository, and so on. The format of each item is the same as in the previous example.

In both cases, if instead of using `day` granularity, you’re going to use `all`, then you’ll have the data for the whole period.
