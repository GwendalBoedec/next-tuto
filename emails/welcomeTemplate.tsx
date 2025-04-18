import React from 'react'
import { Html, Body, Container, Text, Link, Preview} from "@react-email/components"

const welcomeTemplate = ({name} : {name: string}) => {
  return (
    <Html>
        <Preview> Welcome aboard! </Preview>
        <Body>
            <Container>
                <Text>Hello {name}</Text>
                <Link href='https://codewithmosh.com'>check our website</Link>
            </Container>
        </Body>
    </Html>
  )
}

export default welcomeTemplate