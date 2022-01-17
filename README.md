# FortyTime Management [![CircleCI][badge]][circle]

This project contains libraries for the following languages:

* Ruby: https://rubygems.org/gems/forty_time
* TypeScript: https://www.npmjs.com/package/forty-time

It's used to encapsulate some business logic that's shared wherever I write code
for the Forty project.

## Cutting a new release

The process of cutting a new release is mostly managed by CircleCI. All that
needs to be done locally is running the release script:

```
# those args are old/new version numbers
$ ./bin/release 0.0.0 0.0.1
```

This script will find the old version, replace with the new version and then do
all the git things to get GitHub updated and kick off the release job on Circle.

NOTE! The branch protection rules for `main` get in the way here so before
running this, ensure `Include administrators` is UNCHECKED. Once done check it
again to turn the protection back on.

[badge]: https://circleci.com/gh/verynicecode/forty-time-management.svg?style=svg
[circle]: https://circleci.com/gh/verynicecode/forty-time-management
