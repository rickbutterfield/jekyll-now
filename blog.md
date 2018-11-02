---
layout: default
---

<section class="c-posts">
  {% for post in site.posts %}
    {% unless post.draft %}
    <article class="c-post">
      <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
      <p class="date text-muted text-uppercase">
        <time datetime="{{post.date}}">
          {{ post.date | date: "%B %e, %Y" }}
        </time>
      </p>
      <p>{{ post.excerpt }}</p>
    </article>
    {% endunless %}
  {% endfor %}
</section>