import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import {Helmet} from 'react-helmet'
import Link from 'gatsby-link'
import { DiscussionEmbed } from "disqus-react";
import Content, { HTMLContent } from '../components/Content'

import "katex/dist/katex.min.css"

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
} 

BlogPostTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.instanceOf(Helmet),
}


class BlogPost extends React.PureComponent {
  constructor(props){
    super(props);
  }

  render(){

    const { markdownRemark: post } = this.props.data;

    const siteTitle = post.frontmatter.title;
    const { previous, next } = this.props.pathContext;
    const disqusShortname = "https-blog-sardor-io";
    const disqusConfig = {
      identifier: post.id,
      title: post.frontmatter.title,
    };

    return(
      <div>
        <BlogPostTemplate
          content={post.html}
          contentComponent={HTMLContent}
          description={post.frontmatter.description}
          helmet={<Helmet title={`${post.frontmatter.title} | Blog`} />}
          tags={post.frontmatter.tags}
          title={post.frontmatter.title}
        />
        <div className="container content disqus-div">
          <div className="columns">
            <div className="column is-10 is-offset-1">
              <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />  
            </div>
          </div>
        </div>
      </div>
    );
  }
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
