# Hello cloud developers,

This is the github.io source code page for [azure.github.io](http://azure.github.io). Please feel free to fork and
submit a pull request if you want to correct or add some content.

Cheers!

## Get Started

- Install Ruby and the Ruby DevKit on your system of choice.

    **Note** If you're running Ruby on a Windows machine, make sure your DevKit path variables are setup using the Dev Kit [quickstart instructions](https://github.com/oneclick/rubyinstaller/wiki/development-kit#quick-start).
- Install Node/NPM
- Run `bundle install` from the root of the project. Note: If you do not have Bundler installed, run `gem install bundler` beforehand.
- Run `npm install` from the root of the project.
- Run `npm install gulp -g`

## Usage

- To build the site, run `gulp`.
- If you would like to see draft posts, you need to add `--drafts` [gulpfile.js](./gulpfile.js) line 73
  - TODO: automatically show drafts locally

## Authoring a Blog posts

To create a new post, check out https://jekyllrb.com/docs/posts/. After reading the aforementioned link, you
will have a better understanding of how to create a post, but not the FrontMatter yaml supported by default. 
We support the following FrontMatter yaml by default:

- title: is the title of the post and shown as the large header for the post
- subtitle: is the subtitle of the post and shown as subtext to the main header
- tags: an array of categories for the post. Each tag produces an index of tagged pages
- bigimg: an array of images which will rotate behind the title of the post
- comments: allow disqus comments on the post

### Sample FrontMatter

```yaml
title: Deploying a Resource Manager Template
subtitle: Building infrastructure with Ruby on Azure
tags:
  - Ruby
  - IaaS
bigimg:
  - /images/hero-partners.png
  - https://udemy-images.udemy.com/course/750x422/8082_e627_11.jpg
  - https://images7.alphacoders.com/679/thumb-1920-679140.png
comments: true
```

### Sample Draft

You can find a sample draft in the [_drafts](./_drafts) folder.

### Ready to Post?

Open a pull request with your changes and upon merge, your post will be deployed to https://azure.github.io.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request that targets the Jekyll branch. *The master branch is intended for generated html only, not contributions.*

## License and Copyright

*[azure.github.io](http://azure.github.io)* is free software released under the [MIT License](http://www.opensource.org/licenses/MIT).
