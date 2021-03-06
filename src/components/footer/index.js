import React from 'react'
import { Link as GatsbLink, StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'

import styled, { css } from 'styled-components'

import SectionContact from './sectionContact'

import { Container } from '../../styles'
import { theme } from '../../styles/global'
import { flex, rem, phone } from '../../styles/utils'

const Wrapper = styled.footer`
  ${flex({ x: 'space-between', y: 'center' })}
  flex-direction: column;

  padding: 0 ${rem(20)} ${rem(10)};
  height: ${({ theme }) => `calc(${theme.navHeight} * 2)`};

  width: 100%;
  background: ${({ path, theme }) => (path && path.includes('portfolio') && theme.blue) || '#fff'};

  ${phone(css`
    flex-direction: column;
  `)}
`

const linkStyles = css`
  color: ${({ theme }) => theme.lightFont};
  padding: ${rem(4)};
`

const Link = styled(GatsbLink)`
  ${linkStyles}
  font-size: ${rem(12)};
`

const ExternalLink = styled.a.attrs(({ to }) => ({
  href: to
}))`
  ${linkStyles}
  font-size: ${rem(16)};
`

const Section = styled(Container)`
  ${phone(css`
    flex-direction: column;
    justify-content: center;
  `)}
`

const Copyright = styled.span`
  text-align: center;
  color: ${({ theme }) => theme.lightFont};
  font-size: ${rem(10)};
  margin-bottom: ${rem(4)};
`

const SocialBlock = styled.div`
  order: 2;

  ${phone(css`
    order: 1;
  `)}
`

const LegalBlock = styled.div`
  order: 1;

  ${phone(css`
    order: 12;
  `)}
`

const icon = name => {
  const Component = require("react-icons/fa")['Fa' + name]
  return <Component />
}

const LinksLegal = ({ meta }) => (
  <LegalBlock>
    {meta.nav.map(({ name, path, section }) => section === 'footer' && (
      <Link
        key={name}
        to={path}
        activeStyle={{ color: theme.blue }}
      >
        {name}
      </Link>
    ))}
  </LegalBlock>
)

LinksLegal.propTypes = {
  meta: PropTypes.object.isRequired
}

const LinksSocial = ({ socials }) => (
  <SocialBlock>
    {socials.map(social => (
      <ExternalLink
        key={social.name}
        title={social.name}
        to={social.link}>
        {icon(social.name)}
      </ExternalLink>
    ))}
  </SocialBlock>
)

LinksSocial.propTypes = {
  socials: PropTypes.array.isRequired
}

const Footer = ({ path }) => (
  <StaticQuery
    query={query}
    render={({ footer, site: { meta } }) => (
      <>
        <SectionContact contact={footer.contactInfo}/>
        <Wrapper path={path}>
          <Section
            size={{ w: '100%', h: '100%' }}
            position={{ x: 'space-between', y: 'center' }}
          >
            <LinksLegal meta={meta} />
            <LinksSocial socials={footer.social}/>
          </Section>
          <Copyright>
            {footer.copyright}
          </Copyright>
        </Wrapper>
      </>
    )}
  />

)

Footer.propTypes = {
  path: PropTypes.string
}

export default Footer

const query = graphql`
  query FOOTER_QUERY {
    site {
      meta: siteMetadata {
        nav {
          name
          path
          section
        }
      }
    }
    footer: contentfulFooter {
      contactInfo {
        city
        mail
        address {
          md: childMarkdownRemark {
            rawMarkdownBody
          }
        }
        icon {
          fixed(width: 90) {
            ...GatsbyContentfulFixed_tracedSVG
          }
        }
      }
      social {
        name
        link
      }
      copyright
    }
  }
`
