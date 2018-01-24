import React from "react";
import g from "glamorous";
import { css } from "glamor";
import Link from "gatsby-link";

import { rhythm } from "../utils/typography";

const linkStyle = css({ float: `right` });

export default ({ children, data }) => 
    <g.Div
        margin={`0 auto`}
        maxWidth={800}
        padding={rhythm(2)}
        paddingTop={rhythm(1.5)}
    >
        <Link to={`/`}>
            <g.H1
                marginBottom={rhythm(2)}
                display={`inline-block`}
                fontStyle={`normal`}
                color={`#173EFB`}
                font-family={`oswald`}
                font-weight={`bold`}
                font-size={`60px`}
            >
                {data.site.siteMetadata.title}

            </g.H1>
        </Link>
        {children()}
    </g.Div>

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`