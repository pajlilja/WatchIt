# Contributing

## Commit messages

For the commit messages, write them with the following points in mind:

- Write the messages in imperative form, `Add new feature` instead of `Added new feature`.
- Capital letters at the beginning of the sentence.
- No period at the end of the sentence.
- Keep your messages brief and make sure the sentence is short enough to
not cause a line break (happens around 50 characters).
 - If you need more than 50 characters, consider either committing smaller changes or writing more details in the message body (see link below for more details).

For further info, please read http://chris.beams.io/posts/git-commit/


## Implementing new features and working with branches

Never commit to the master branch (This feature is blocked anyways) - this is because the master branch should always contain a working copy of the project.

But it's still important to commit often (and not commit too many things at once, which can clutter up your commit messages), so when working on something, create a new branch like this:

```
$ git pull
$ git checkout -b Branch_Name
```

The first command will update your local copy of the git repository. The second command will create the branch `Branch_Name` and take you to it.

Be sure to give your branch a good, descriptive but still short name that will accurately describe what it's for.

When you're inside a branch, you can commit and push just as usual.

Switching to another existing branch is simple, just type:

`$ git checkout Branch_Name`

When you are done with the feature/fix/update, send a pull request to `master`. Someone else will then review
your code and merge it to `master` if it looks good :thumbsup:

Make sure to delete the branch after it is merged!

## Using Issues

The project will use Github issues when there are new requirements, features or bugs for the project. Explain each
issue with a fitting title and why it's needed in the description. Also make sure you have labels explaining what kind of an issue it is.
