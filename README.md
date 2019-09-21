# Gatsby Source Instagram (Puppeteer)

*You should not use this*
I made this as a result of joking around with a coworker about the Instagram API deprecation.

If you _do_ use it, install it:
```
npm i theschmocker/gatsby-source-instagram-puppeteer
```

add it to your Gatsby config with the desired account as an option:

```javascript
...
{
    resolve: 'gatsby-plugin-instagram-puppeteer',
    options: {
        account: 'github',
    },
},
...
```

and query it in your components:

```javascript
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Image from 'gatsby-image';

const InstagramPhotos = () => {
    const data = useStaticQuery(graphql`
    {
        allInstagramPhoto {
            nodes {
                alt
                localFile {
                    childImageSharp {
                        fixed(width: 400) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        }
    }
    `)

    return ( 
        <>
            {data.allInstagramPhoto.nodes.map(node => (
                <Image alt={node.alt} fixed={node.localFile.childImageSharp.fixed} />
            ))} 
        </>
    )
}
```

But seriously: _don't use this_. It's liable to break if Instagram's markup changes, and it's probably against some TOS or policy of some kind.