---
layout: default
---

<section class="c-posts">
  {% for post in site.posts %}
    {% unless post.draft %}
    <article class="c-post">
      <h2><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
      <ul class="date text-muted text-uppercase">
        <li>
          <time datetime="{{page.date}}">
            {{ post.date | date: "%B %e, %Y" }}
          </time>
        </li>
        <li role="presentation">|</li>
        <li>
            {% capture words %}
            {{ post.content | number_of_words | minus: 180 }}
            {% endcapture %}
            {{ words | plus: 150 | divided_by: 150 | append: ' minutes to read' }}
        </li>
      </ul>
      <p>{{ post.excerpt }}</p>
    </article>
    {% endunless %}
  {% endfor %}
</section>