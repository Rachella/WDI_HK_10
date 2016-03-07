## Learning Rails + Angular.js with Instagram
#### Add Comment in Angular.js

Steps:

1. Add Comment to Post's Angular View

In `rails-instagram/app/assets/templates/posts/index.html`,

```html
<div class="container-fluid">
  <div class="row">
   <div ng-repeat="post in posts track by $index">
      <div class="page-header">
        {{ post.title }}
        {{ post.content }}
        {{ post.category }}
        <small>
          {{ post.created_at | date }}
        </small>
      </div>

      <ul class="list-group">
        <li class="list-group-item" ng-repeat="comment in post.comments">
          <div>
            {{ comment.content }}
          </div>
          <small>
            {{ comment.created_at | date }}
          </small>
        </li>
      </ul>
    </div>
  </div>
</div>
```

#### Task: Allow commenting on each post

- Add an input box and necessary Angular code to allow commenting on each post!
