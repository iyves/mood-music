Yves Wienecke<Br/>
Steven Borrego

# CS465 Final Project - Mood Music

Synthesia is a peculiar medical condition that combines senses together.

A person may:
* Hear a sound and see a color
* Smell something and hear a sound
* See a word and taste a flavor

This project is meant to be a representation of what Synthesia might look like to those who have it.

1. Enter a song or playlist
2. We calculate a color for each song 
3. Visualize your data!

This project uses an express backend, bootstrap frontend, and apis such as Spotify and d3.

<hr/>

## [Notes for git](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow):

![Visualization of git branch management.](https://wac-cdn.atlassian.com/dam/jcr:b5259cce-6245-49f2-b89b-9871f9ee3fa4/03%20(2).svg?cdnVersion=lb).

```
// Create a development branch for ongoing features
git branch develop
git push -u origin develop
```

```
// Track changes from an existing branch (after develop branch is created)
git checkout --track origin/develop
```

```
// Delete a branch
git branch -d branch_to_delete
```

```
// Change current branch to 'develop' and create a branch for a new feature
git checkout develop
git checkout -b feature_branch
```

```
// When done with a feature branch
git checkout develop
git merge feature_branch
```


# Spotify API references

* [spotify-web-api-node for making requests](BQA6hJ6ecDWcFEeO1GZOamgZYrtFpkXoOsEFhTPUAtkfpPrPD0dCkB0qvjL3G2sL2UaOZVB084I6s4fD4PoOX7YBCQucZydyv2CqlHXMHIG1Ht6_6pGKXAWBuk_tVQgOh3HOzvMQ6dQkYlLEQZlKtXudIV63BAVnuA)
